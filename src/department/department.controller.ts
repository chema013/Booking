import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService
  ) {}

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'create',
    resource: AppResources.DEPARTMENT
  })
  @Auth()
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @ApiQuery({name: 'limit', description: 'Max number of results for page. IT IS OPTIONAL, it can be empty.', type: Number, example: 2, required: false })
  @ApiQuery({name: 'page', description: 'Number of page, can be 0 to n. IT IS OPTIONAL, it can be empty.', type: Number, example: 0, required: false })
  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'create',
    resource: AppResources.DEPARTMENT
  })
  @Auth()
  @Get()
  findAll(@Query('limit') limit, @Query('page') page) {
    return this.departmentService.findAll(limit, page);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'create',
    resource: AppResources.DEPARTMENT
  })
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'update',
    resource: AppResources.DEPARTMENT
  })
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'delete',
    resource: AppResources.DEPARTMENT
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
