import { Inject, Injectable, LoggerService } from '@nestjs/common';
import StorageService from '../storage/storage.service';
import { LOGGER_PINO } from './providers/logger.provider.const';

@Injectable()
export class PinoLoggerService implements LoggerService {
  public constructor(
    @Inject(LOGGER_PINO)
    private readonly pino: any,
    private readonly storageService: StorageService<Map<string, string>>,
  ) {}

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  error(message: any, trace?: string, context?: string): any {
    const traceId = this.storageService.getStore()?.get('traceId');
    this.pino.error({ traceId }, this.getMessage(message, context));
    if (trace) {
      this.pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    const traceId = this.storageService.getStore()?.get('traceId');
    this.pino.info({ traceId }, this.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    const traceId = this.storageService.getStore()?.get('traceId');
    this.pino.warn({ traceId }, this.getMessage(message, context));
  }
}
