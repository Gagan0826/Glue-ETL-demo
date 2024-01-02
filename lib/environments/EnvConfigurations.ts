import { CdkCommand } from "aws-cdk-lib/cloud-assembly-schema";
import * as cdk from "aws-cdk-lib";

export interface envConfigs {
    accountDetails: cdk.StackProps;
    resources: ResourceVariables;
    scriptLocation:pyfiles
}

interface ResourceVariables {
    environment: string;
    sourceBucketName: string;
    sourceBucketId: string;
    destinationBucketName: string;
    destinationBucketId: string;
    lambdaRoleName: string;
    lambdaRoleId: string;
    lambdaFunctionName: string;
    lambdaFunctionId: string;
    glueJobRole: string;
    glueJobRoleid: string;
    glueJobName: string;
    glueJobId: string;
    ETLScriptLocation: string;
    ETLScriptBucketId: string;
    ETLScriptBucketName: string;
    firstLambdaId:string;
    firstLambdaName:string;
    secondLambdaId:string;
    secondLambdaName:string;
    subscriptionFilterId:string;
    subscriptionFilterName:string;
    searchMessage:string;
    scriptBucketLocation:string
}
interface pyfiles{
    location: string[]
}