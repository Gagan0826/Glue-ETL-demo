file={
    "messageType": "DATA_MESSAGE",
    "owner": "382663127776",
    "logGroup": "/aws/lambda/lambda-1",
    "logStream": "2023/11/30/[$LATEST]728a26c522204667aa7d1a5a90270ac7",
    "subscriptionFilters": [
        "search-for-success"
    ],
    "logEvents": [
        {
            "id": "37941401060429967932720756520644684847000958952014544899",
            "timestamp": 1701351265290,
            "message": "sentance\\n"
        },
        {
            "id": "37941401060429967932720756520644684847000958952014544902",
            "timestamp": 1701351265290,
            "message": "success\\n"
        }
    ]
}
ls=[]
for i in file["logEvents"]:
    message=i["message"].strip("\\n")
    ls.append(message)
print(ls)