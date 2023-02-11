import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class RangeDto {
  @ApiProperty()
  @IsNumber()
  public readonly from: number;

  @ApiProperty()
  @IsNumber()
  public readonly to: number;
}
