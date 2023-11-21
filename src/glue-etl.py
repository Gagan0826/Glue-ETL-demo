import sys
import boto3
import os
import awsglue
from awsglue.utils import getResolvedOptions
args=getResolvedOptions(sys.argv,["source_bucket","destination_bucket"])
# args = {
#     'source_bucket': "prod-source-bucket-552",
#     'destination_bucket': 'prod-destination-bucket-552',
# }
source_bucket = args['source_bucket']
destination_bucket = args['destination_bucket']

s3 = boto3.client('s3')

try:
    response = s3.list_objects(Bucket=source_bucket)
except Exception as e:
    print(f"Error listing objects in the source bucket: {e}")
    sys.exit(1)


for obj in response.get('Contents', []):
    key = obj['Key']
    copy_source = {'Bucket': source_bucket, 'Key': key}
    destination_key = key 

    try:
        s3.copy_object(CopySource=copy_source, Bucket=destination_bucket, Key=destination_key)
        print(f"Object copied from {source_bucket}/{key} to {destination_bucket}/{destination_key}")
    except Exception as e:
        print(f"Error copying object: {e}")

print("Objects copied from {} to {}".format(source_bucket, destination_bucket))
