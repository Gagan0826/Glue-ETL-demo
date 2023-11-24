#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GlueDemoStack } from '../lib/glue-demo-stack';
import { devenv } from '../lib/environments/dev';
import { prodenv } from '../lib/environments/prod';

const app = new cdk.App();
new GlueDemoStack(app, 'dev-GlueDemoStack',devenv);
//new GlueDemoStack(app, 'prod-GlueDemoStack',prodenv);