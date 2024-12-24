import { PartialType } from '@nestjs/swagger';
import { CreateSocialmediaDto } from './create-socialmedia.dto';

export class UpdateSocialmediaDto extends PartialType(CreateSocialmediaDto) {}
