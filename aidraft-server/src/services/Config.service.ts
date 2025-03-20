import { Injectable } from '@nestjs/common';
import { ConfigService as NestJsConfigService } from '@nestjs/config';
import { DatabaseInfo, FirebaseEnvConfig } from 'src/types/common';

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

  getGeminiKey(): string {
    return this.nestConfigService.get<string>('GEMINI_API_KEY');
  }

  getFirebaseConfig(): FirebaseEnvConfig {
    return {
      client_email: this.nestConfigService.get<string>('FB_EMAIL'),
      project_id: this.nestConfigService.get<string>('FB_PROJECT_ID'),
      private_key: this.nestConfigService.get<string>('FB_KEY'),
    };
  }

  getJwtSecret(): string {
    return this.nestConfigService.get<string>('JWT_SECRET');
  }

  getDefaultExpiration(): number {
    return parseInt(this.nestConfigService.get<string>('JWT_EXP') ?? '3600');
  }
}
