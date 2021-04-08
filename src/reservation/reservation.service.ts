import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonZone } from 'src/common-zone/entities/common-zone.entity';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(UserResident)
    private readonly userResidentRepository: Repository<UserResident>,
    @InjectRepository(CommonZone)
    private readonly zoneRepository: Repository<CommonZone>
    ) {}

  async create(createReservationDto: CreateReservationDto) {

    const resident = await this.userResidentRepository.findOne(Number(createReservationDto.userResidentId));
    const zone = await this.zoneRepository.findOne(Number(createReservationDto.commonZoneId));
    if( !resident || !zone ) throw new NotFoundException('Resident id or Zone id does not exists, id is not valid');
    createReservationDto.commonZone = zone;
    createReservationDto.userResident = resident;

    if(this.validateHour(createReservationDto.start, createReservationDto.finish)){
      throw new NotFoundException('Hour not valid, another reservation is overlapping');
    }

    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);

  }

  async findAll(limit: string, page: string) {
    const reservations = await this.reservationRepository.find(
      { where: {state: true}, take: Number(limit), skip: Number(page) * Number(limit) }
      );

    if(!reservations) throw new NotFoundException('Reservations not found');

    return reservations;
  }

  async findOne(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('Reservation does not exists, id is not valid');
    return await this.reservationRepository.findOne(id);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne(id);
    if(!reservation) throw new NotFoundException('Reservation does not exist')

    if( updateReservationDto.commonZoneId ){
          const zone = await this.zoneRepository.findOne(Number(updateReservationDto.commonZoneId));
          if( zone ) updateReservationDto.commonZone = zone;
          else throw new NotFoundException('Zone does not exists');
    }

    if( updateReservationDto.userResidentId ){
      const user = await this.userResidentRepository.findOne(Number(updateReservationDto.userResidentId));
      if( user ) updateReservationDto.userResident = user;
      else throw new NotFoundException('Resident does not exists');
    }

    const editedDepartment = Object.assign(reservation, updateReservationDto);
    return await this.reservationRepository.save(editedDepartment);
  }

  async remove(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('Reservation does not exists, id is not valid');

    const reservation = await this.reservationRepository.findOne(id);
        const result = await this.reservationRepository.delete(id);
        if (result.affected === 1){
            return reservation;
        }
        return { message: 'Reservation does not exists' }
  }

  async validateHour(start: string, finish: string) {
    let ms = Date.parse(start);
    const hourInit = new Date(ms);
    ms = Date.parse(finish);
    const hourfinish = new Date(ms);

    const reservations = await this.reservationRepository.find()
    const result = reservations.filter( item => ((item.start >= hourfinish || item.start < hourInit) && (item.finish > hourfinish || item.finish <= hourInit) ) )

    console.log(result);

    if (result.length > 0) return true;
    else return false;
  }

}
