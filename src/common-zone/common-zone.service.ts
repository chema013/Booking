import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Repository, UpdateDateColumn } from 'typeorm';
import { CreateCommonZoneDto } from './dto/create-common-zone.dto';
import { UpdateCommonZoneDto } from './dto/update-common-zone.dto';

import { CommonZone } from './entities/common-zone.entity';

@Injectable()
export class CommonZoneService {

  constructor(
    @InjectRepository(CommonZone)
    private readonly commonZoneRepository: Repository<CommonZone>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createCommonZoneDto: CreateCommonZoneDto) {

    if( !createCommonZoneDto.reservations ) createCommonZoneDto.reservations = [];
    const zone = this.commonZoneRepository.create((createCommonZoneDto as any));
    return await this.commonZoneRepository.save(zone);
  }

  async findAll(limit: string, page: string) {
    const zones = await this.commonZoneRepository.find(
      { where: {booking: true}, take: Number(limit), skip: Number(page) * Number(limit) }
    );
    if(!zones) throw new NotFoundException('Zone does not found');

    return zones;
  }

  async findOne(id: number) {
    const zone = await this.commonZoneRepository.findOne(id);
    if(!zone) throw new NotFoundException('Zone does not found');

    return zone;
  }

  async update(id: number, updateCommonZoneDto: UpdateCommonZoneDto) {
    let reservationsArray = [];
    const zone = await this.commonZoneRepository.findOne(id);

    if(!zone) throw new NotFoundException('Zone does not exist')

    if( updateCommonZoneDto.reservations ){
      for (const reservationid of updateCommonZoneDto.reservations) {
          const reservation = await this.reservationRepository.findOne(Number(reservationid));
          if( reservation ) reservationsArray.push(zone);
          else throw new NotFoundException('Reservation Id does not exists');
      }

      updateCommonZoneDto.reservations = reservationsArray;
    }

    const editedZone = Object.assign(zone, updateCommonZoneDto);
    return await this.commonZoneRepository.save(editedZone);
  }

  async remove(id: number) {
    const zone = await this.commonZoneRepository.findOne(id);
    const result = await this.commonZoneRepository.delete(id);
    if (result.affected === 1){
        return zone;
    }
    return { message: 'Zone does not exists' }
  }
}
