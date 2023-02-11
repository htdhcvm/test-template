import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import StorageService from '../../modules/storage/storage.service';
import * as crypto from 'crypto';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(
    private readonly storageService: StorageService<Map<string, string>>,
  ) {}

  use(req: Request, _: Response, next: NextFunction) {
    const traceId = req.headers['x-request-id'] || crypto.randomUUID();
    const store = new Map().set('traceId', traceId);

    this.storageService.run(store, () => {
      next();
    });
  }
}
