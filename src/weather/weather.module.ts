import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEntity } from 'src/entities/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherEntity])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule { }
