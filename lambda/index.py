import boto3 
import os

glue=boto3.client('glue')

def handler(event,context):
    names={
        "--source_bucket":os.environ["sourceBucketname"],
        "--destination_bucket":os.environ["destinationBucketname"]
           }
    
    print(os.environ['glueJobname'])
    glue_job_name= os.environ['glueJobname']
    glue.start_job_run(JobName=glue_job_name,Arguments=names)

    return {
        'statusCode': 200,
        'body': 'Glue job started successfully',
    }
