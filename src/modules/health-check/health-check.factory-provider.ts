import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const HEALTH_CHECK_VALUE_NAME = Symbol('HEALTH_CHECK_VALUE_NAME');

export interface HealthCheckValue {
  readonly port: number;
}

const healthCheckFactoryProvider: FactoryProvider = {
  provide: HEALTH_CHECK_VALUE_NAME,
  useFactory: (configService: ConfigService): HealthCheckValue => ({
    port: +configService.get('port'),
  }),
  inject: [ConfigService],
};

export default healthCheckFactoryProvider;
