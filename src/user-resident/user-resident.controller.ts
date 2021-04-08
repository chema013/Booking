import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { UserResidentService } from './user-resident.service';
import { CreateUserResidentDto } from './dto/create-user-resident.dto';
import { UpdateUserResidentDto } from './dto/update-user-resident.dto';
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from 'nest-access-control';

import { Auth } from 'src/common/decorators';
import { AppResources } from 'src/app.roles';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user-resident')
export class UserResidentController {
  constructor(
    private readonly userResidentService: UserResidentService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
    ) {}

  @ApiBody({ description: 'User Data', type: CreateUserResidentDto})
  @Post()
  create(@Body() createUserResidentDto: CreateUserResidentDto) {
    return this.userResidentService.create(createUserResidentDto);
  }

  @ApiQuery({name: 'limit', description: 'Max number of results for page. IT IS OPTIONAL, it can be empty.', type: Number, example: 2, required: false })
  @ApiQuery({name: 'page', description: 'Number of page, can be 0 to n. IT IS OPTIONAL, it can be empty.', type: Number, example: 0, required: false })
  @Get()
  findAll(@Query('limit') limit, @Query('page') page) {
    return this.userResidentService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResidentService.findOne(+id);
  }

  @ApiBody({ description: 'User Data', type: CreateUserResidentDto})
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
