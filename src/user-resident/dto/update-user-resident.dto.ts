import { PartialType } from '@nestjs/mapped-types';
import { CreateUserResidentDto } from './create-user-resident.dto';

export class UpdateUserResidentDto extends PartialType(CreateUserResidentDto) {}
