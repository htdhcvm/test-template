import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async (configService: ConfigService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.get('database.host'),
          logging: configService.get('database.logging'),
          username: configService.get('database.username'),
          database: configService.get('database.database'),
          password: configService.get('database.password'),
          port: configService.get('database.port'),
          entities: [],
        });
        await dataSource.initialize();
        return dataSource;
      },
      inject: [ConfigService],
    },
  ],
})
export default class TypeOrmRootModule {}
