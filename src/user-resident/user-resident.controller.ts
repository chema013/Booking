import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserResidentService } from './user-resident.service';
import { CreateUserResidentDto } from './dto/create-user-resident.dto';
import { UpdateUserResidentDto } from './dto/update-user-resident.dto';

@Controller('user-resident')
export class UserResidentController {
  constructor(private readonly userResidentService: UserResidentService) {}

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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserResidentDto: UpdateUserResidentDto) {
    return this.userResidentService.update(+id, updateUserResidentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResidentService.remove(+id);
  }
}
