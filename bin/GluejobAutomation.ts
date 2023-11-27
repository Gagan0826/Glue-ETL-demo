#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GluejobAutomation } from '../lib/GluejobAutomation-stack';
import { devenv } from '../lib/environments/DevEnv';
import { prodenv } from '../lib/environments/ProdEnv';

const app = new cdk.App();
new GluejobAutomation(app, 'Dev-GlueDemoStack', devenv);
// new GlueDemoStack(app, 'prod-GlueDemoStack', prodenv);
