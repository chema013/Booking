import { PartialType } from '@nestjs/mapped-types';
import { CreateCommonZoneDto } from './create-common-zone.dto';

export class UpdateCommonZoneDto extends PartialType(CreateCommonZoneDto) {}
