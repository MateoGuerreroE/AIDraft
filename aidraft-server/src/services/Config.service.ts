import { Injectable } from '@nestjs/common';
import { ConfigService as NestJsConfigService } from '@nestjs/config';
import { DatabaseInfo } from 'src/types/common';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestJsConfigService) {}

  getDatabaseConfig(): DatabaseInfo {
    return {
      host: this.nestConfigService.get<string>('DB_HOST'),
      port: parseInt(this.nestConfigService.get<string>('DB_PORT') ?? '3306'),
      user: this.nestConfigService.get<string>('DB_USER'),
      password: this.nestConfigService.get<string>('DB_PASSWORD'),
      database: this.nestConfigService.get<string>('DB_NAME'),
    };
  }
}
