import { Construct } from 'constructs';
import { envConfigs } from './environments/EnvConfigurations';
import * as cdk from 'aws-cdk-lib';
import {
  aws_s3 as s3,
  aws_lambda as lambda,
  aws_glue as glue,
  aws_s3_notifications as s3n,
  aws_iam as iam,
  aws_s3_deployment as s3deploy,
} from "aws-cdk-lib";

export class glueJobAutomation extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: envConfigs) {
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
      code: lambda.Code.fromAsset('lambda/TriggerGluejob'),
      handler: "index.handler",
      role: lambdaRole,
      environment: {
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
        name: 'pythonshell',
        pythonVersion: '3',
        scriptLocation: `${props?.resources.ETLScriptLocation}`,
      },
      role: glueRole.roleArn,
      glueVersion: "1.0",
      executionProperty: {
        maxConcurrentRuns: 10,
     },

    });

    const scriptBucket = new s3.Bucket(this, `${props?.resources.environment}-${props?.resources.ETLScriptBucketId}`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `${props?.resources.environment}-${props?.resources.ETLScriptBucketName}`
    });

    new s3deploy.BucketDeployment(this, 'DeployFiles', {
      sources: [s3deploy.Source.asset('./src/GlueETLScript/')],
      destinationBucket: scriptBucket,
    });
  }
}