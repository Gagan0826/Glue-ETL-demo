import { envconfigs } from "./env-configs";
export const prodenv:envconfigs={
    accountDetails:{
        env:{
            account:"663839140840",
            region:"ap-south-1"
    }, 
    stackName:"Glue-ETL-demo-prod"
},
resources:{
    environment:"prod",
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
    etlScriptLocation:"s3://prod-etl-scripts-552/glue-etl.py",
    eltlScriptBucketId:"ETLscriptBcucket",
    eltlScriptBucketName:"etl-scripts-552",
}
}