import sys
import boto3
import os
import awsglue
from awsglue.utils import getResolvedOptions
import json
args = getResolvedOptions(sys.argv, ["source_bucket", "destination_bucket", "files"])
# args = {
#     'source_bucket': "prod-source-bucket-552",
#     'destination_bucket': 'prod-destination-bucket-552',
# }
source_bucket = args['source_bucket']
destination_bucket = args['destination_bucket']
filenames=json.loads(args["files"])

s3 = boto3.client('s3')
print(filenames)

for file in filenames:
    copy_source = {'Bucket': source_bucket, 'Key': file}
    print(file)
    file=file.replace("+"," ")
    print(file)
    try:
        s3.copy_object(CopySource=copy_source, Bucket=destination_bucket, Key=file)
        print(f"Object copied from {source_bucket}/{file} to {destination_bucket}/{file}")
    except Exception as e:
        print(f"Error copying object: {e}")

print("Objects copied from {} to {}".format(source_bucket, destination_bucket))
