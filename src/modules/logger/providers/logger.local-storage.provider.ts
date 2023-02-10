import { FactoryProvider } from '@nestjs/common';
import { LOGGER_STORAGE } from './logger.provider.const';
import { AsyncLocalStorage } from 'async_hooks';

const loggerStorageProvider: FactoryProvider = {
  provide: LOGGER_STORAGE,
  useFactory: () => {
    return new AsyncLocalStorage();
  },
};

export default loggerStorageProvider;
