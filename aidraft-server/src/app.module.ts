import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { ContentModule } from './modules/Content.module';
import { IdentityModule } from './modules/Identity.module';

@Module({
  imports: [DataModule, ContentModule, IdentityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
