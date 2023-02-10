import { Module } from '@nestjs/common';
import { PinoLoggerService } from './logger.service';
import loggerStorageProvider from './providers/logger.local-storage.provider';
import loggerPinoProvider from './providers/logger.pino.provider';

@Module({
  providers: [loggerPinoProvider, loggerStorageProvider, PinoLoggerService],
  exports: [PinoLoggerService],
})
export default class LoggerModule {}
