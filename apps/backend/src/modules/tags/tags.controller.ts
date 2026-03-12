import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { createTagSchema } from './schemas/create-tag.schema';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBody({type: CreateTagDto, examples: {
    tag: {
      value: {
        name: "games"
      }
    }
  }})
  @ApiOkResponse({
    description: 'The tag was created.',
    example: {
      id: "24fb3538-27...",
      name: "education"
    }
  })
  @Post()
  async create(@Body(new YupValidationPipe(createTagSchema)) createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }

  @ApiOkResponse({
    description: 'Returns all tags.',
    example: [
      {
        id: "24fb3538-27...",
        name: "education"
      },
      {
        id: "24fb3538-28...",
        name: "games"
      }
    ]
  })
  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  @ApiOkResponse({
    description: 'The tag was deleted.',
    example: {
      id: "24fb3538-27...",
      name: "education"
    }
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
