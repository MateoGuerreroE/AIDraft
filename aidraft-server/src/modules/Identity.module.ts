import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRecord } from 'src/data';
import { LoggingModule } from './Logging.module';
import { ConfigModule } from './Config.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService, UserService } from 'src/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRecord]),
    LoggingModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: configService.getDefaultExpiration() },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class IdentityModule {}
