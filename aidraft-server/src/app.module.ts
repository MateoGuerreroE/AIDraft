import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { ContentModule } from './modules/Content.module';

@Module({
  imports: [DataModule, ContentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
