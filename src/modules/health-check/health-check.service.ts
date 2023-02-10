import { Inject, Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import {
  HealthCheckValue,
  HEALTH_CHECK_VALUE_NAME,
} from './health-check.factory-provider';

@Injectable()
export default class HealthService {
  public constructor(
    @Inject(HEALTH_CHECK_VALUE_NAME)
    private readonly healthCheckValue: HealthCheckValue,
    private readonly healthCheckService: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @HealthCheck()
  public async healthCheck() {
    return this.healthCheckService.check([
      () =>
        this.http.pingCheck(
          'application',
          `http://127.0.0.1:${this.healthCheckValue.port}/api/swagger`,
        ),
      () => this.db.pingCheck('database'),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
