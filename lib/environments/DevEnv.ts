import { envConfigs } from "./EnvConfigurations";

export const devEnvironment: envConfigs = {
    accountDetails: {
        env: {
            account: "382663127776",
            region: "ap-south-1"
        },
        stackName: "Glue-ETL-demo-dev"
    },

    resources: {
        environment: "dev",
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
        ETLScriptLocation: "s3://dev-etl-scripts-552/PushFilesToDestination.py",
        ETLScriptBucketId: "ETLscriptBcucket",
        ETLScriptBucketName: "etl-scripts-552",

        firstLambdaId:"lambda-generate-logs",
        firstLambdaName:"lambda-1",
        secondLambdaId:"triggered-lambda",
        secondLambdaName:"lambda-2",
        subscriptionFilterId:"subscription-filter",
        subscriptionFilterName:"subFilter",
        searchMessage:"success",

        pyFiles:'s3://dev-etl-scripts-552/one.py,s3://dev-etl-scripts-552/two.py,s3://dev-etl-scripts-552/three.py'
    }
};