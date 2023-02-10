import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import HealthCheckController from './health-check.controller';
import HealthCheckService from './health-check.service';
import healthCheckFactoryProvider from './health-check.factory-provider';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, healthCheckFactoryProvider],
})
export default class HealthCheckModule {}
