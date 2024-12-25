import { PartialType } from '@nestjs/swagger';
import { CreateReleationDto } from './create-releation.dto';

export class UpdateReleationDto extends PartialType(CreateReleationDto) {}
