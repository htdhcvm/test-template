import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import JwtTokenService from './jwt.service';

export type JwtOptions = JwtModuleOptions & { name: symbol };

const getServiceProvider = (options: JwtOptions): FactoryProvider => {
  const { name, ...another } = options;
  return {
    provide: name,
    useFactory: () => {
      return new JwtTokenService(new JwtService({ ...another }));
    },
  };
};

@Global()
@Module({})
export default class JwtTokenModule {
  static register(options: JwtOptions): DynamicModule {
    return {
      module: JwtTokenModule,
      imports: [],
      providers: [getServiceProvider(options)],
      exports: [getServiceProvider(options)],
    };
  }
}
