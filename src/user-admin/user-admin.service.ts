import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

import { UserAdmin } from './entities/user-admin.entity';

export interface UserFindOnebyUsername {
  id?: number;
  username?: string;
}
@Injectable()
export class UserAdminService {

  constructor(
    @InjectRepository(UserAdmin)
    private readonly userAdmRepository: Repository<UserAdmin>
  ) {}

  async create(createUserAdminDto: CreateUserAdminDto) {
    const userAdmin = this.userAdmRepository.create(createUserAdminDto);
    const user = await this.userAdmRepository.save(userAdmin);

    delete user.password;
    return user;
  }

  async findAll() {
    return await this.userAdmRepository.find();
  }

  async findOne(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('User does not exists, id is not valid');
    return await this.userAdmRepository.findOne(id);
  }

  async update(id: number, updateUserAdminDto: UpdateUserAdminDto) {
    if ( Number.isNaN(id) ) throw new NotFoundException('User does not exists, id is not valid');

    const userAdm = await this.userAdmRepository.findOne(id);

    if(!userAdm) throw new NotFoundException('User does not exist');

    const editeUserAdm = Object.assign(userAdm, updateUserAdminDto);
    return await this.userAdmRepository.save(editeUserAdm);
  }

  async remove(id: number) {
    if ( Number.isNaN(id) ) throw new NotFoundException('User does not exists, id is not valid');

    const userR = await this.userAdmRepository.findOne(id);
        const result = await this.userAdmRepository.delete(id);
        if (result.affected === 1){
            return userR;
        }
        return { message: 'User does not exists' }
  }

  async findByUsername( data: UserFindOnebyUsername ) {
    return await this.userAdmRepository
      .createQueryBuilder('useradmin')
      .where( data )
      .addSelect('useradmin.password')
      .getOne()
  }

}
