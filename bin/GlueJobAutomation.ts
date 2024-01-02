#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { glueJobAutomation } from '../lib/GlueJobAutomation-stack';
import { devEnvironment } from '../lib/environments/DevEnv';
import { prodEnvironment } from '../lib/environments/ProdEnv';

const app = new cdk.App();
new glueJobAutomation(app, 'Dev-GlueDemoStack', devEnvironment);
// new GlueDemoStack(app, 'prod-GlueDemoStack', prodEnvironment);