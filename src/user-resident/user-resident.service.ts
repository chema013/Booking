import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/department/entities/department.entity';
import { Repository } from 'typeorm';
import { CreateUserResidentDto } from './dto/create-user-resident.dto';
import { UpdateUserResidentDto } from './dto/update-user-resident.dto';

import { UserResident } from './entities/user-resident.entity';

export interface UserFindOnebyUsername {
  id?: number;
  username?: string;
}
@Injectable()
export class UserResidentService {

  constructor(
    @InjectRepository(UserResident)
    private readonly userResRepository: Repository<UserResident>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
    ) {}

  async create(createUserResidentDto: CreateUserResidentDto) {

    let departmentsArray = [];

    for (const departmentid of createUserResidentDto.departments) {
        const department = await this.departmentRepository.findOne(Number(departmentid));
        if( department ) departmentsArray.push(department);
        else throw new NotFoundException('Department id does not exists');
    }

    createUserResidentDto.departments = departmentsArray;
    const userResident = this.userResRepository.create(createUserResidentDto);
    const user = await this.userResRepository.save(userResident);
    delete user.password;
    return user;

  }

  async findAll(limit, page) {
    return await this.userResRepository.find({ where: {roles: ['RESIDENT']}, take: Number(limit), skip: Number(page) * Number(limit) });
  }

  async findOne(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('User does not exists, id is not valid');
    return await this.userResRepository.findOne(id);
  }

  async update(id: number, updateUserResidentDto: UpdateUserResidentDto) {
    if ( Number.isNaN(id) ) throw new NotFoundException('User does not exists, id is not valid');

    let departmentsArray = [];
    const userR = await this.userResRepository.findOne(id);
    if(!userR) throw new NotFoundException('User does not exist');

    if(updateUserResidentDto.departments){
      for (const departmentid of updateUserResidentDto.departments) {
        const department = await this.departmentRepository.findOne(Number(departmentid));
        if( department ) departmentsArray.push(department);
        else throw new NotFoundException();
      }

      updateUserResidentDto.departments = departmentsArray;
    }

    const editeUserR = Object.assign(userR, updateUserResidentDto);
    return await this.userResRepository.save(editeUserR);
  }

  async remove(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('User does not exists, id is not valid');

    const userR = await this.userResRepository.findOne(id);
        const result = await this.userResRepository.delete(id);
        if (result.affected === 1){
            return userR;
        }
        return { message: 'User does not exists' }
  }

  async findByUsername( data: UserFindOnebyUsername ) {
    return await this.userResRepository
      .createQueryBuilder('user')
      .where( data )
      .addSelect('user.password')
      .getOne()
  }
}
