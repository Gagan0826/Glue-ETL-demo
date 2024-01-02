import { Construct } from 'constructs';
import { envconfigs } from './environments/EnvConfigurations';
import * as cdk from 'aws-cdk-lib';
import {
  aws_s3 as s3,
  aws_lambda as lambda,
  aws_glue as glue,
  aws_s3_notifications as s3n,
  aws_iam as iam,
  aws_s3_deployment as s3deploy,
} from "aws-cdk-lib";

export class GluejobAutomation extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: envconfigs) {
    super(scope, id, props?.accountDetails);

    const SourceBucket = new s3.Bucket(this, `${props?.resources.Environment}-${props?.resources.SourceBucketId}`, {
      bucketName: `${props?.resources.Environment}-${props?.resources.SourceBucketName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const DestinationBucket = new s3.Bucket(this, `${props?.resources.Environment}-${props?.resources.DestinationBucketId}`, {
      bucketName: `${props?.resources.Environment}-${props?.resources.DestinationBucketName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const LambdaRole = new iam.Role(this, `${props?.resources.Environment}-${props?.resources.LambdaRoleId}`, {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      roleName: `${props?.resources.Environment}-${props?.resources.LambdaFunctionName}`
    });

    LambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: ['glue:StartJobRun'],
      resources: ["*"],
    }));

    const LambdaTrigger = new lambda.Function(this, `${props?.resources.Environment}-${props?.resources.LambdaFunctionId}`, {
      functionName: `${props?.resources.Environment}-${props?.resources.LambdaFunctionName}`,
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset('lambda/TriggerGluejob'),
      handler: "index.handler",
      role: LambdaRole,
      environment: {
        SourceBucketname: `${props?.resources.Environment}-${props?.resources.SourceBucketName}`,
        DestinationBucketname: `${props?.resources.Environment}-${props?.resources.DestinationBucketName}`,
        glueJobname: `${props?.resources.Environment}-${props?.resources.GlueJobName}`,
      }
    });

    SourceBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(LambdaTrigger));

    const GlueRole = new iam.Role(this, `${props?.resources.Environment}-${props?.resources.GlueJobRoleid}`, {
      assumedBy: new iam.ServicePrincipal("glue.amazonaws.com"),
      roleName: `${props?.resources.Environment}-${props?.resources.GlueJobRole}`
    });

    GlueRole.addToPolicy(new iam.PolicyStatement({
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

    const GlueJob = new glue.CfnJob(this, `${props?.resources.Environment}-${props?.resources.GlueJobId}`, {
      name: `${props?.resources.Environment}-${props?.resources.GlueJobName}`,
      command: {
        name: 'pythonshell',
        pythonVersion: '3',
        scriptLocation: `${props?.resources.ETLScriptLocation}`,
      },
      role: GlueRole.roleArn,
      glueVersion: "1.0",
      executionProperty: {
        maxConcurrentRuns: 10,
     },

    });

    const ScriptBucket = new s3.Bucket(this, `${props?.resources.Environment}-${props?.resources.ETLScriptBucketId}`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `${props?.resources.Environment}-${props?.resources.ETLScriptBucketName}`
    });

    new s3deploy.BucketDeployment(this, 'DeployFiles', {
      sources: [s3deploy.Source.asset('./src/GlueETLScript/')],
      destinationBucket: ScriptBucket,
    });
  }
}