import { Module } from '@nestjs/common';
import { ReleationService } from './releations.service';
import { ReleationController } from './releations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Releation } from './entities/releation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Releation])],
  controllers: [ReleationController],
  providers: [ReleationService],
})
export class ReleationsModule {}
