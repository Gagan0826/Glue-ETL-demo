import boto3
import os
import json

glue = boto3.client('glue')
s3 = boto3.client('s3')

def handler(event, context):
    glue_job_name = os.environ['glueJobname']
    FileNames = []

    for record in event["Records"]:
        FileNames.append(record['s3']['object']['key'])

    print(FileNames)
    FilenamesJson = json.dumps(FileNames)
    print(FilenamesJson)

    names = {
            "--source_bucket": os.environ["SourceBucketname"],
            "--destination_bucket": os.environ["DestinationBucketname"],
            "--files": FilenamesJson,
    }
    try:
        response = glue.start_job_run(JobName=glue_job_name, Arguments=names)
        print(response)
        StatusCode = response["ResponseMetadata"]["HTTPStatusCode"]
        if StatusCode == 200:
            return {
                'statusCode': StatusCode,
                'body': 'Glue job started successfully',
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Failed to start gluejob {e}',
        }