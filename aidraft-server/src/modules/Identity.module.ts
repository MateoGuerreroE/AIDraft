import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRecord } from 'src/data';
import { LoggingModule } from './Logging.module';
import { ConfigModule } from './Config.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService, FireBaseAuthService, UserService } from 'src/services';
import { AuthenticationService } from 'src/types';
import { UserController } from 'src/controller';
import { AuthController } from 'src/controller/Auth.controller';
import { JwtStrategy } from 'src/Jwt.strategy';

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
  controllers: [UserController, AuthController],
  providers: [
    JwtStrategy,
    UserService,
    JwtService,
    { provide: AuthenticationService, useClass: FireBaseAuthService },
  ],
  exports: [UserService],
})
export class IdentityModule {}
