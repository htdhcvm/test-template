import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  PrometheusModule,
  PrometheusOptions,
} from '@willsoto/nestjs-prometheus';

export type MetricsOptions = {
  available: boolean;
} & PrometheusOptions;

@Global()
@Module({})
export default class MetricsModule {
  public static register(options?: MetricsOptions): DynamicModule {
    if (!options) {
      return {
        module: MetricsModule,
      };
    }

    if (options && options.available === false) {
      return {
        module: MetricsModule,
      };
    }

    return {
      module: MetricsModule,
      imports: [PrometheusModule.register(options)],
      providers: []
    };
  }
}
