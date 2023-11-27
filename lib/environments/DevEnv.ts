import { envconfigs } from "./EnvConfigurations";

export const devenv: envconfigs = {
    accountDetails: {
        env: {
            account: "382663127776",
            region: "ap-south-1"
        },
        stackName: "Glue-ETL-demo-dev"
    },

    resources: {
        Environment: "dev",
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
        ETLScriptLocation: "s3://dev-etl-scripts-552/PushFilesToDestination.py",
        ETLScriptBucketId: "ETLscriptBcucket",
        ETLScriptBucketName: "etl-scripts-552",
    }
};
