import boto3 
import os
import json
glue=boto3.client('glue')
s3 = boto3.client('s3')

def handler(event,context):
    glue_job_name= os.environ['glueJobname']
    filenames=[]
    for record in event["Records"]:
        filenames.append(record['s3']['object']['key'])
    print(filenames)
    FilenamesJson=json.dumps(filenames)
    print(FilenamesJson)

    names={
    "--source_bucket":os.environ["sourceBucketname"],
    "--destination_bucket":os.environ["destinationBucketname"],
    "--files":FilenamesJson,
        }
    glue.start_job_run(JobName=glue_job_name,Arguments=names)
    return {
        'statusCode': 200,
        'body': 'Glue job started successfully',
    }
