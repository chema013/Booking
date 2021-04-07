import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(UserResident)
    private readonly userResRepository: Repository<UserResident>
    ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    let usersArray = [];

      for (const userid of createDepartmentDto.residents) {
          const user = await this.userResRepository.findOne(Number(userid));
          if( user ) usersArray.push(user);
          else throw new NotFoundException();
      }

      createDepartmentDto.residents = usersArray;
      const department = this.departmentRepository.create((createDepartmentDto as any));
      return await this.departmentRepository.save(department);
  }

  async findAll() {
    const departments = await this.departmentRepository.find();
    if(!departments) throw new NotFoundException('Departments not found');

    return departments;
  }

  async findOne(id: number) {
    const department = await this.departmentRepository.findOne(id);
    if(!department) throw new NotFoundException('Department not found');

    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    let usersArray = [];
    const department = await this.departmentRepository.findOne(id);

    if(!department) throw new NotFoundException('Department does not exist')

    if( updateDepartmentDto.residents ){
      for (const userid of updateDepartmentDto.residents) {
          const user = await this.userResRepository.findOne(Number(userid));
          if( user ) usersArray.push(user);
          else throw new NotFoundException();
      }

      updateDepartmentDto.residents = usersArray;
    }

    const editedDepartment = Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(editedDepartment);
  }

  async remove(id: number) {
    const department = await this.departmentRepository.findOne(id);
    const result = await this.departmentRepository.delete(id);
    if (result.affected === 1){
        return department;
    }
    return { message: 'Department does not exists' }
  }
}
