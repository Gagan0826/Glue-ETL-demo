import { CdkCommand } from "aws-cdk-lib/cloud-assembly-schema";
import * as cdk from "aws-cdk-lib";

export interface envconfigs {
    accountDetails: cdk.StackProps;
    resources: ResourceVariables;
}

interface ResourceVariables {
    Environment: string;
    SourceBucketName: string;
    SourceBucketId: string;
    DestinationBucketName: string;
    DestinationBucketId: string;
    LambdaRoleName: string;
    LambdaRoleId: string;
    LambdaFunctionName: string;
    LambdaFunctionId: string;
    GlueJobRole: string;
    GlueJobRoleid: string;
    GlueJobName: string;
    GlueJobId: string;
    ETLScriptLocation: string;
    ETLScriptBucketId: string;
    ETLScriptBucketName: string;
}
