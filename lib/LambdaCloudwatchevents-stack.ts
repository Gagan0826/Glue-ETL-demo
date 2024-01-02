import * as cdk from 'aws-cdk-lib';
import {aws_lambda as lambda,
  aws_logs_destinations as destination} from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { FilterPattern } from 'aws-cdk-lib/aws-logs';
import { envConfigs } from './environments/EnvConfigurations';


export class lambdaCloudwatchevents extends cdk.Stack {
  constructor(scope: Construct, id: string, props: envConfigs) {
    super(scope, id, props.accountDetails);
    const firstLambda= new lambda.Function(this,`${props.resources.environment}-${props.resources.firstLambdaId}`,{
      functionName:`${props.resources.environment}-${props.resources.firstLambdaName}`,
      runtime:Runtime.PYTHON_3_9,
      code:lambda.Code.fromAsset("lambda/lambda-generate-logs/"),
      handler:"index.handler",
    })

    const secondLambda= new lambda.Function(this,`${props.resources.environment}-${props.resources.secondLambdaId}`,{
      functionName:`${props.resources.environment}-${props.resources.secondLambdaName}`,
      handler:"index.handler",
      code: lambda.Code.fromAsset("lambda/triggered-lambda-function"),
      runtime:Runtime.PYTHON_3_9,
    })
    const subFilter= firstLambda.logGroup.addSubscriptionFilter(`${props.resources.environment}-${props.resources.subscriptionFilterId}`,{
      destination: new destination.LambdaDestination(secondLambda),
      filterPattern: FilterPattern.anyTerm(`${props.resources.searchMessage}`),
      filterName:`${props.resources.environment}-${props.resources.subscriptionFilterName}`,
      
    })
  }
}
