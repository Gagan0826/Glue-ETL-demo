import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs';
import * as glue from 'aws-cdk-lib/aws-glue'
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as iam from 'aws-cdk-lib/aws-iam';
import { envconfigs } from './environments/env-configs';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class GlueDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: envconfigs) {
    super(scope, id, props?.accountDetails);

    const sourceBucket = new s3.Bucket(this, `${props?.resources.environment}-${props?.resources.sourceBucketId}`, {
      bucketName: `${props?.resources.environment}-${props?.resources.sourceBucketName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const destinationBucket = new s3.Bucket(this, `${props?.resources.environment}-${props?.resources.destinationBucketId}`, {
      bucketName: `${props?.resources.environment}-${props?.resources.destinationBucketName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const lambdaRole = new iam.Role(this, `${props?.resources.environment}-${props?.resources.lambdaRoleId}`, {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      roleName: `${props?.resources.environment}-${props?.resources.lambdaFunctionName}`
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: ['glue:StartJobRun'],
      resources: ["*"],
    }));

    const lambdaTrigger = new lambda.Function(this, `${props?.resources.environment}-${props?.resources.lambdaFunctionId}`, {
      functionName: `${props?.resources.environment}-${props?.resources.lambdaFunctionName}`,
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset('lambda'),
      handler: "index.handler",
      role: lambdaRole,
      environment:{
        sourceBucketname: `${props?.resources.environment}-${props?.resources.sourceBucketName}`,
        destinationBucketname: `${props?.resources.environment}-${props?.resources.destinationBucketName}`,
        glueJobname: `${props?.resources.environment}-${props?.resources.glueJobName}`,
    }
    });
    sourceBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(lambdaTrigger));

    const glueRole = new iam.Role(this, `${props?.resources.environment}-${props?.resources.glueJobRoleid}`, {
      assumedBy: new iam.ServicePrincipal("glue.amazonaws.com"),
      roleName: `${props?.resources.environment}-${props?.resources.glueJobRole}`
    });
    
    glueRole.addToPolicy(new iam.PolicyStatement({
      actions: [
        's3:GetObject',
        's3:PutObject',
        's3:ListBucket',
        's3:DeleteObject',
        'glue:StartJobRun',
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:PutLogEvents'
        
      ],
      resources: ["*"],
    }));

    const glueJob = new glue.CfnJob(this, `${props?.resources.environment}-${props?.resources.glueJobId}`, {
      name: `${props?.resources.environment}-${props?.resources.glueJobName}`,
      command: {
        name: 'glueetl',
        pythonVersion: '3',
        scriptLocation: `${props?.resources.etlScriptLocation}`,
      },
      role: glueRole.roleArn,
      executionProperty: {
        maxConcurrentRuns: 1000,
      },
      glueVersion: "2.0",
      maxCapacity: 1,
      maxRetries: 0, 
    });

    const scriptBucket = new s3.Bucket(this, `${props?.resources.environment}-${props?.resources.eltlScriptBucketId}`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY, 
      bucketName:`${props?.resources.environment}-${props?.resources.eltlScriptBucketName}`
    });
    new s3deploy.BucketDeployment(this, 'DeployFiles', {
      sources: [s3deploy.Source.asset('./src/')],
      destinationBucket: scriptBucket,
    });
  } 
}