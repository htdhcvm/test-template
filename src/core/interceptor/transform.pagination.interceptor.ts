import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { PAGINATION_DEFAULT_OPTIONS } from '../../common/const/pagination.default';

@Injectable()
export class TransformPaginationInterceptor<T>
  implements NestInterceptor<Partial<T>, T>
{
  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    const query = context.switchToHttp().getRequest().query;
    return next.handle().pipe(
      map((response) => {
        if (!query) return response;

        if (Object.keys(query).length === 0) return response;

        const { take, skip } = this.getTakeSkip(query);

        if (Array.isArray(response)) {
          return {
            data: response,
            meta: {
              count: null,
              take: take,
              skip: skip,
            },
          };
        }

        const { data, count } = response;

        return {
          data,
          meta: {
            count,
            take: take,
            skip: skip,
          },
        };
      }),
    );
  }

  private getTakeSkip(query) {
    let take = PAGINATION_DEFAULT_OPTIONS.take;
    let skip = PAGINATION_DEFAULT_OPTIONS.skip;

    if (query.page) {
      take = query.page.take;
      skip = query.page.skip;
    }

    return {
      take: Number(take),
      skip: Number(skip),
    };
  }
}
