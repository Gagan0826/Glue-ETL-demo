import boto3
import os
import json

glue = boto3.client('glue')
s3 = boto3.client('s3')

def handler(event, context):
    glueJobName = os.environ['glueJobname']
    fileNames = []

    for record in event["Records"]:
        fileNames.append(record['s3']['object']['key'])

    print(fileNames)
    fileNamesJson = json.dumps(fileNames)
    print(fileNamesJson)

    names = {
            "--sourceBucket": os.environ["sourceBucketname"],
            "--destinationBucket": os.environ["destinationBucketname"],
            "--files": fileNamesJson,
            
    }
    #start the glue job
    try:
        response = glue.start_job_run(JobName=glueJobName,Arguments=names)                                     
        print(response)
        statusCode = response["ResponseMetadata"]["HTTPStatusCode"]
        if statusCode == 200:
            return {
                'statusCode': statusCode,
                'body': 'Glue job started successfully',
            }
        else:
            print("Failed to start gluejob")

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Failed to start gluejob {e}',
        }