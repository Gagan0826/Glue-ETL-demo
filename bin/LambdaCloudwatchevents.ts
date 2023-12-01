import * as cdk from 'aws-cdk-lib';
import {lambdaCloudwatchevents} from "../lib/LambdaCloudwatchevents-stack"
import { devEnvironment } from '../lib/environments/DevEnv';
import { prodEnvironment } from '../lib/environments/ProdEnv';

const app=new cdk.App()
new lambdaCloudwatchevents(app,"LambdaCloudwatchDemo",devEnvironment)