import sys
import boto3
import os
from awsglue.utils import getResolvedOptions
import json

args = getResolvedOptions(sys.argv, ["source_bucket", "destination_bucket", "files"])

SourceBucket = args['source_bucket']
DestinationBucket = args['destination_bucket']
filenames = json.loads(args["files"])

s3 = boto3.client('s3')
print(filenames)

for file in filenames:
    copy_source = {'Bucket': SourceBucket, 'Key': file}
    print(file)
    file = file.replace("+", " ")
    print(file)
    try:
        s3.copy_object(CopySource=copy_source, Bucket=DestinationBucket, Key=file)
        print(f"Object copied from {SourceBucket}/{file} to {DestinationBucket}/{file}")
    except Exception as e:
        print(f"Error copying object: {e}")

print("Objects copied from {} to {}".format(SourceBucket, DestinationBucket))