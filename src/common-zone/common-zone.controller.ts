import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { CommonZoneService } from './common-zone.service';
import { CreateCommonZoneDto } from './dto/create-common-zone.dto';
import { UpdateCommonZoneDto } from './dto/update-common-zone.dto';

@Controller('common-zone')
export class CommonZoneController {
  constructor(private readonly commonZoneService: CommonZoneService) {}

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'create',
    resource: AppResources.ZONES
  })
  @Auth()
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

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'update',
    resource: AppResources.ZONES
  })
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommonZoneDto: UpdateCommonZoneDto) {
    return this.commonZoneService.update(+id, updateCommonZoneDto);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'delete',
    resource: AppResources.ZONES
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonZoneService.remove(+id);
  }
}
