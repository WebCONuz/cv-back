import { PartialType } from '@nestjs/swagger';
import { CreateUsermessageDto } from './create-usermessage.dto';

export class UpdateUsermessageDto extends PartialType(CreateUsermessageDto) {}
