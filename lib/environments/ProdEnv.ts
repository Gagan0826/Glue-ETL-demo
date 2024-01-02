import { envConfigs } from "./EnvConfigurations";

export const prodEnvironment: envConfigs = {
    accountDetails: {
        env: {
            account: "663839140840",
            region: "ap-south-1"
        },
        stackName: "Glue-ETL-demo-prod"
    },

    resources: {
        environment: "prod",
        sourceBucketName: "source-bucket-552",
        sourceBucketId: "sourceBucket",
        destinationBucketName: "destination-bucket-552",
        destinationBucketId: "destinationBucket",
        lambdaRoleName: "grant-glue-access",
        lambdaRoleId: "lambda-role",
        lambdaFunctionName: "trigger-gluejob",
        lambdaFunctionId: "trigger-lambda",
        glueJobRole: "GluejobRole",
        glueJobRoleid: "glueJobRole",
        glueJobName: "Push-to-destination",
        glueJobId: "Push-to-destination",
        ETLScriptLocation: "s3://prod-etl-scripts-552/PushFilesToDestination.py",
        ETLScriptBucketId: "ETLscriptBcucket",
        ETLScriptBucketName: "etl-scripts-552",

        firstLambdaId:"lambda-generate-logs",
        firstLambdaName:"lambda-1",
        secondLambdaId:"triggered-lambda",
        secondLambdaName:"lambda-2",
        subscriptionFilterId:"subscription-filter",
        subscriptionFilterName:"subFilter",
        searchMessage:"success",
    }
};