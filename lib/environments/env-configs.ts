import { CdkCommand } from "aws-cdk-lib/cloud-assembly-schema";
import * as cdk from "aws-cdk-lib"
export interface envconfigs{
    accountDetails:cdk.StackProps
    resources:vars
}

interface vars{
environment:string,
sourceBucketName:string,
sourceBucketId:string,
destinationBucketName:string,
destinationBucketId: string,
lambdaRoleName:string,
lambdaRoleId:string,
lambdaFunctionName:string,
lambdaFunctionId:string
glueJobRole:string,
glueJobRoleid:string,
glueJobName:string,
glueJobId:string,
etlScriptLocation:string,
eltlScriptBucketId:string,
eltlScriptBucketName:string,
}