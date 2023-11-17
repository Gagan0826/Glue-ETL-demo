import sys
import boto3
import os
# Get job parameters
args = {
    'source_bucket': "dev-source-bucket-552",
    'destination_bucket': 'dev-destination-bucket-552',
}

# Source and destination S3 bucket names
source_bucket = args['source_bucket']
destination_bucket = args['destination_bucket']

# Initialize a Boto3 S3 client
s3 = boto3.client('s3')

# List objects in the source bucket
response = s3.list_objects(Bucket=source_bucket)

# Copy each object from the source bucket to the destination bucket
for obj in response.get('Contents', []):
    key = obj['Key']
    copy_source = {'Bucket': source_bucket, 'Key': key}
    destination_key = key  # You can modify the destination key as needed

    try:
        # Copy the object and rename it in the destination bucket
        s3.copy_object(CopySource=copy_source, Bucket=destination_bucket, Key=destination_key)
        print(f"Object copied from {source_bucket}/{key} to {destination_bucket}/{destination_key}")
    except Exception as e:
        print(f"Error copying object: {e}")
    

# Print a message to indicate the job completion
print("Objects copied from {} to {}".format(source_bucket, destination_bucket))
