import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tagsProviders } from './tags.providers';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [TagsController],
  providers: [
    ...tagsProviders,
    TagsService
  ],
  exports: [TagsService]
})
export class TagsModule {}
