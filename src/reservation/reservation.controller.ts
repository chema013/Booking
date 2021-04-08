import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'create',
    resource: AppResources.RESERVATION
  })
  @Auth()
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @ApiQuery({name: 'limit', description: 'Max number of results for page. IT IS OPTIONAL, it can be empty.', type: Number, example: 2, required: false })
  @ApiQuery({name: 'page', description: 'Number of page, can be 0 to n. IT IS OPTIONAL, it can be empty.', type: Number, example: 0, required: false })
  @Get()
  findAll(@Query('limit') limit, @Query('page') page) {
    return this.reservationService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'update',
    resource: AppResources.RESERVATION
  })
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'delete',
    resource: AppResources.RESERVATION
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
