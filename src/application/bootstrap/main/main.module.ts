import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MetricsModule from '../../../adapters/metrics/metrics.module';
import TypeOrmRootModule from '../../../adapters/typeorm/typeorm.module';
import { LoggerMiddleware } from '../../../core/middleware/logger.middleware';
import HealthCheckModule from '../../../modules/health-check/health-check.module';
import LoggerModule from '../../../modules/logger/logger.module';
import StorageModule from '../../../modules/storage/storage.module';
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

const MODULES = [HealthCheckModule, LoggerModule, StorageModule];

const APPLICATION = [];
@Module({
  imports: [
    ConfigModule.forRoot(mainConfiguration.get()),
    ...ADAPTERS,
    ...MODULES,
    ...APPLICATION,
  ],
})
export default class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/metrics', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
