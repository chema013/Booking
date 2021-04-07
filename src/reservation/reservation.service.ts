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

    const resident = await this.userResidentRepository.findOne(createReservationDto.userResidentId);
    const zone = await this.zoneRepository.findOne(createReservationDto.userResidentId);
    if( !resident || !zone ) throw new NotFoundException('Resident id or Zone id does not exists, id is not valid');
    createReservationDto.commonZone = zone;
    createReservationDto.userResident = resident;

    const reservation = this.reservationRepository.create(createReservationDto);
    return await this.reservationRepository.save(reservation);

  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findOne(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('Reservation does not exists, id is not valid');
    return await this.reservationRepository.findOne(id);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
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
}
