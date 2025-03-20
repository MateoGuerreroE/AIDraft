import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/modules';
import { ConfigService } from 'src/services';
import { DatabaseInfo } from 'src/types/common';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseInfo: DatabaseInfo = configService.getDatabaseConfig();
        return {
          type: 'mysql',
          host: databaseInfo.host,
          port: databaseInfo.port,
          username: databaseInfo.user,
          password: databaseInfo.password,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DataModule {}
