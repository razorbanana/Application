import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { TAGS_REPOSITORY } from 'src/constants';
import { Tag } from 'src/database/entities/tag.entity';

@Injectable()
export class TagsService {

  constructor(
    @Inject(TAGS_REPOSITORY)
    private tagsRepository: Repository<Tag>,
  ){}

  async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto)
    return await this.tagsRepository.save(tag)
  }

  async findAll() {
    return await this.tagsRepository.find()
  }

  async findById(id: string) {
    return await this.tagsRepository.findOne({where: {id}})
  }

  async findByIds(ids: string[]){
    return this.tagsRepository.find({
      where: {
        id: In(ids),
      }
    })
  }

  async findByNames(names: string[]){
    return this.tagsRepository.find({
      where: {
        name: In(names)
      }
    })
  }

  async remove(id: string) {
    return await this.tagsRepository.delete(id)
  }
}
