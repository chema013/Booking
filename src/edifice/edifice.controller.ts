import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdificeService } from './edifice.service';
import { CreateEdificeDto } from './dto/create-edifice.dto';
import { UpdateEdificeDto } from './dto/update-edifice.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Edifice')
@Controller('edifice')
export class EdificeController {
  constructor(private readonly edificeService: EdificeService) {}

  @Post()
  create(@Body() createEdificeDto: CreateEdificeDto) {
    return this.edificeService.create(createEdificeDto);
  }

  @Get()
  findAll() {
    return this.edificeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.edificeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEdificeDto: UpdateEdificeDto) {
    return this.edificeService.update(+id, updateEdificeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.edificeService.remove(+id);
  }
}
