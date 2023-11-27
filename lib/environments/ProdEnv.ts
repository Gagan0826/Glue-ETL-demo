import { envconfigs } from "./EnvConfigurations";

export const prodenv: envconfigs = {
    accountDetails: {
        env: {
            account: "663839140840",
            region: "ap-south-1"
        },
        stackName: "Glue-ETL-demo-prod"
    },

    resources: {
        Environment: "prod",
        SourceBucketName: "source-bucket-552",
        SourceBucketId: "sourceBucket",
        DestinationBucketName: "destination-bucket-552",
        DestinationBucketId: "destinationBucket",
        LambdaRoleName: "grant-glue-access",
        LambdaRoleId: "lambda-role",
        LambdaFunctionName: "trigger-gluejob",
        LambdaFunctionId: "trigger-lambda",
        GlueJobRole: "GluejobRole",
        GlueJobRoleid: "glueJobRole",
        GlueJobName: "Push-to-destination",
        GlueJobId: "Push-to-destination",
        ETLScriptLocation: "s3://prod-etl-scripts-552/PushFileToDestination.py",
        ETLScriptBucketId: "ETLscriptBcucket",
        ETLScriptBucketName: "etl-scripts-552",
    }
};
