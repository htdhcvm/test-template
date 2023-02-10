import { ConfigModuleOptions } from '@nestjs/config';
import stringToBooleanHelper from '../../../common/helper/string-to-boolean.helper';
import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';
import Configuration from '../configuration';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  APP_NAME: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsNumber()
  DB_PORT: number;

  @IsBoolean()
  DB_LOGGING: boolean;
}

class MainConfiguration implements Configuration {
  private loadConfig() {
    return {
      port: parseInt(process.env.PORT, 10) || 3000,
      appName: process.env.APP_NAME,
      database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
        port: parseInt(process.env.DB_PORT, 10),
        password: process.env.DB_PASSWORD,
        logging:
          process.env.NODE_ENV === 'production'
            ? false
            : stringToBooleanHelper(process.env.DB_LOGGING),
      },
    };
  }

  private getValidate(config: Record<string, any>): Record<string, any> {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }

  public get(): ConfigModuleOptions {
    return {
      isGlobal: true,
      load: [this.loadConfig],
      validate: this.getValidate,
    };
  }
}

const mainConfiguration = new MainConfiguration();
export default mainConfiguration;
