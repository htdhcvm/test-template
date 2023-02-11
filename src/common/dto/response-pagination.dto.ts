import { ApiProperty } from '@nestjs/swagger';
import MetaDto from './meta.dto';

export default class ResponseMetaDto<T> {
  @ApiProperty()
  public readonly data: T[];

  @ApiProperty({
    type: MetaDto,
  })
  public readonly meta: MetaDto;
}



