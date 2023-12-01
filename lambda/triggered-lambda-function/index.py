import json
import gzip
import base64
def handler(event, context):
    encodedZippedBinaryData = event['awslogs']['data']
    zippedBinaryData = base64.b64decode(encodedZippedBinaryData)
    binaryData = gzip.decompress(zippedBinaryData)
    
    jsonString = binaryData.decode("utf-8")
    jsonData=json.loads(jsonString)

    messages=""
    for log in jsonData["logEvents"]:
        message=log["message"].strip("\\n")
        messages=messages+" "+message
        messages.strip("\\n")
    
    print("The trigger message is :",messages)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
