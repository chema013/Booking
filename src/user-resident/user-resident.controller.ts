import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserResidentService } from './user-resident.service';
import { CreateUserResidentDto } from './dto/create-user-resident.dto';
import { UpdateUserResidentDto } from './dto/update-user-resident.dto';
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from 'nest-access-control';

import { Auth } from 'src/common/decorators';
import { AppResources } from 'src/app.roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user-resident')
export class UserResidentController {
  constructor(
    private readonly userResidentService: UserResidentService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
    ) {}

  @Post()
  create(@Body() createUserResidentDto: CreateUserResidentDto) {
    return this.userResidentService.create(createUserResidentDto);
  }

  @Get()
  findAll() {
    return this.userResidentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResidentService.findOne(+id);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'update',
    resource: AppResources.RESIDENT
  })
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserResidentDto: UpdateUserResidentDto) {
    return this.userResidentService.update(+id, updateUserResidentDto);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'delete',
    resource: AppResources.RESIDENT
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResidentService.remove(+id);
  }
}
