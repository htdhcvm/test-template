import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Max } from 'class-validator';
import { PAGINATION_DEFAULT_OPTIONS } from '../const/pagination.default';
import { QUERY_PAGE } from '../const/query.names.const';

export default class PaginationDto {
  @ApiPropertyOptional({
    name: `${QUERY_PAGE}[take]`,
    type: Number,
    default: 10,
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @Max(100)
  public readonly take = PAGINATION_DEFAULT_OPTIONS.take;

  @ApiPropertyOptional({
    name: `${QUERY_PAGE}[skip]`,
    type: Number,
    default: 0,
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  public readonly skip = PAGINATION_DEFAULT_OPTIONS.skip;
}
