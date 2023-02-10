import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MetricsModule from '../../../adapters/metrics/metrics.module';
import TypeOrmRootModule from '../../../adapters/typeorm/typeorm.module';
import HealthCheckModule from '../../../modules/health-check/health-check.module';
import mainConfiguration from './configuration';

const ADAPTERS = [
  TypeOrmRootModule,
  MetricsModule.register({
    available: true,
    pushgateway: {
      url: 'http://127.0.0.1:9090',
    },
    defaultLabels: {
      app: 'template',
    },
  }),
];

const MODULES = [HealthCheckModule];

@Module({
  imports: [
    ConfigModule.forRoot(mainConfiguration.get()),
    ...ADAPTERS,
    ...MODULES,
  ],
})
export default class MainModule {}
