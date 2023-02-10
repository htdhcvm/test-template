import { ConfigModuleOptions } from '@nestjs/config';

interface Configuration {
  get(): ConfigModuleOptions;
}

export default Configuration;
