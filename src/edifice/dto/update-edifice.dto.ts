import { PartialType } from '@nestjs/mapped-types';
import { CreateEdificeDto } from './create-edifice.dto';

export class UpdateEdificeDto extends PartialType(CreateEdificeDto) {}
