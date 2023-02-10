import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import HealthCheckService from './health-check.service';

@Controller('health-check')
@ApiTags('Health check controller')
export default class HealthCheckController {
  public constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  public async check() {
    return this.healthCheckService.healthCheck();
  }
}
