import { envconfigs } from "./env-configs";
export const devenv:envconfigs={
    accountDetails:{
        env:{
            account:"382663127776",
            region:"ap-south-1"
    }, 
    stackName:"Glue-ETL-demo-dev"
},
resources:{
    environment:"dev",
    sourceBucketName: "source-bucket-552",
    sourceBucketId:"SourceBucket",
    destinationBucketName:"destination-bucket-552",
    destinationBucketId:"destinationBucket",
    lambdaRoleName:"grant-glue-access",
    lambdaRoleId:"lambda-role",
    lambdaFunctionName:"trigger-gluejob",
    lambdaFunctionId:"trigger-lambda",
    glueJobRole:"push-to-destination",
    glueJobRoleid:"glueJobRole",
    glueJobName:"Push-to-destination",
    glueJobId:"GlueJob",   
    etlScriptLocation:"s3://dev-etl-scripts-552/glue-etl.py",
    eltlScriptBucketId:"ETLscriptBcucket",
    eltlScriptBucketName:"etl-scripts-552",
}
}
