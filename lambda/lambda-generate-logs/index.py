import json

def handler(event, context):
    words=["any","random","sentance","which", "contains","success","in","it"]
    for word in words:
        print(word)

    return {
        'statusCode': 200,
        'body': "This is first lambda which generates logs"
    }
