import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response, NextFunction } from 'express';
import { LOGGER_STORAGE } from '../../modules/logger/providers/logger.provider.const';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(
    @Inject(LOGGER_STORAGE)
    private readonly storage: AsyncLocalStorage<Map<string, string>>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
