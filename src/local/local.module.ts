import { Module } from '@nestjs/common';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalEntity } from 'src/entities/local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalEntity])],
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule { }
