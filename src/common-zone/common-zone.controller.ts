import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommonZoneService } from './common-zone.service';
import { CreateCommonZoneDto } from './dto/create-common-zone.dto';
import { UpdateCommonZoneDto } from './dto/update-common-zone.dto';

@Controller('common-zone')
export class CommonZoneController {
  constructor(private readonly commonZoneService: CommonZoneService) {}

  @Post()
  create(@Body() createCommonZoneDto: CreateCommonZoneDto) {
    return this.commonZoneService.create(createCommonZoneDto);
  }

  @Get()
  findAll() {
    return this.commonZoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonZoneService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommonZoneDto: UpdateCommonZoneDto) {
    return this.commonZoneService.update(+id, updateCommonZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonZoneService.remove(+id);
  }
}
