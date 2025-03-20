import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRecord } from 'src/data';
import { LoggingModule } from './Logging.module';
import { ConfigModule } from './Config.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRecord]),
    LoggingModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class IdentityModule {}
