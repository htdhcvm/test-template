import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PinoLoggerService } from '../../modules/logger/logger.service';
import excludeUrlInterceptorConst from '../const/exclude-url-interceptor.const';

@Injectable()
export class BenchmarkInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  public constructor(private readonly logger: PinoLoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Partial<T>>,
  ): Observable<T> | Promise<Observable<T>> | any {
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    if (excludeUrlInterceptorConst.includes(handlerName)) {
      return next.handle();
    }

    const now = Date.now();
    this.logger.log(
      `Start execution controller: ${className}, method: ${handlerName}`,
    );

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `End execution controller: ${className}, method: ${handlerName}. Execution time: ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
