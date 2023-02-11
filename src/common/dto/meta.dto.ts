import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class MetaDto {
  @ApiProperty()
  @IsNumber()
  public readonly count: number;

  @ApiProperty()
  @IsNumber()
  public readonly take?: number;

  @ApiProperty()
  @IsNumber()
  public readonly skip?: number;
}
