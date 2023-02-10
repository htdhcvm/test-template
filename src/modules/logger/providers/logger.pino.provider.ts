import { FactoryProvider } from '@nestjs/common';
import * as pinoLogger from 'pino';
import { LOGGER_PINO } from './logger.provider.const';

const loggerPinoProvider: FactoryProvider = {
  provide: LOGGER_PINO,
  useFactory: () => {
    return pinoLogger({
      prettyPrint: true,
    });
  },
};

export default loggerPinoProvider;
