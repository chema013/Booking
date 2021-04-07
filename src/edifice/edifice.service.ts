import { Injectable } from '@nestjs/common';
import { CreateEdificeDto } from './dto/create-edifice.dto';
import { UpdateEdificeDto } from './dto/update-edifice.dto';

@Injectable()
export class EdificeService {
  create(createEdificeDto: CreateEdificeDto) {
    return 'This action adds a new edifice';
  }

  findAll() {
    return `This action returns all edifice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edifice`;
  }

  update(id: number, updateEdificeDto: UpdateEdificeDto) {
    return `This action updates a #${id} edifice`;
  }

  remove(id: number) {
    return `This action removes a #${id} edifice`;
  }
}
