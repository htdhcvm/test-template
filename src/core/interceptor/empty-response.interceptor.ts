import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import Response from '../const/response.const';

@Injectable()
export class EmptyResponseInterceptor<T>
  implements NestInterceptor<Partial<T>, T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<Partial<T>>,
  ): Observable<T> | Promise<Observable<T>> | any {
    const method = context.switchToHttp().getRequest().method;

    return next.handle().pipe(
      map((data) => {
        if (method === 'DELETE') {
          return data;
        }

        if (data === undefined || data === null) {
          return Response.NO_CONTENT;
        }

        return data;
      }),
    );
  }
}
