import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import MainModule from './application/bootstrap/main/main.module';
import { PinoLoggerService } from './modules/logger/logger.service';

class Application {
  private app: INestApplication;
  private configuration: Record<string, any>;

  private host: string;
  private urlPostfix: string;
  private urlPrefix: string;
  private swaggerPostfix: string;

  public constructor() {
    this.urlPrefix = 'http://';
    this.host = '127.0.0.1';
    this.urlPostfix = '/api';
    this.swaggerPostfix = `${this.urlPostfix}/swagger`;
  }

  public initializeSwaggerDocumentation() {
    const config = new DocumentBuilder()
      .setTitle(`Lada ${this.configuration.appName} application`)
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(this.swaggerPostfix, this.app, document);
  }

  public async bootstrap() {
    this.app = await NestFactory.create(MainModule, {
      cors: { origin: '*' },
      bufferLogs: true,
    });

    this.app.useLogger(this.app.get(PinoLoggerService));

    this.initConfiguration();
    this.initializeSwaggerDocumentation();

    this.app.setGlobalPrefix(this.urlPostfix);
    this.app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: false }),
    );

    await this.app.listen(this.configuration.port, this.host);

    this.printStartApp();
  }

  private getUrls() {
    return {
      swaggerUrl: `${this.urlPrefix}${this.host}:${this.configuration.port}${this.swaggerPostfix}`,
      applicationUrl: `${this.urlPrefix}${this.host}:${this.configuration.port}${this.urlPostfix}`,
    };
  }

  private initConfiguration() {
    const configService = this.app.get(ConfigService);

    this.configuration = {
      port: configService.get('port') ? configService.get('port') : 8088,
      appName: configService.get('appName'),
    };
  }

  private printStartApp() {
    const { swaggerUrl, applicationUrl } = this.getUrls();

    Logger.log('\n');
    Logger.log(`Application is running on: ${applicationUrl}`);
    Logger.log(`Swagger path: ${swaggerUrl}`);
  }
}

const app = new Application();
app.bootstrap();
