import sys
from awsglue.utils import getResolvedOptions
import importlib
from one import displayFunctionA
from two import displayFunctionB
from three import displayFunctionC
import json
import boto3

print("main")
displayFunctionA()
displayFunctionB()
displayFunctionC()


args = getResolvedOptions(sys.argv, ["sourceBucket", "destinationBucket", "files"])

SourceBucket = args['sourceBucket']
DestinationBucket = args['destinationBucket']
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