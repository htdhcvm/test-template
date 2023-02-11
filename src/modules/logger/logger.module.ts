import { Global, Module } from '@nestjs/common';
import { PinoLoggerService } from './logger.service';
import loggerPinoProvider from './providers/logger.pino.provider';

@Global()
@Module({
  providers: [loggerPinoProvider, PinoLoggerService],
  exports: [PinoLoggerService],
})
export default class LoggerModule {}
