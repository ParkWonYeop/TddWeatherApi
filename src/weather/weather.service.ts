import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { WeatherEntity } from '../entities/weather.entity';
import { SelectAllWeatherDto, SelectWeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherEntity)
    private weatherRepository: Repository<WeatherEntity>,
  ) { }

  async getWeatherInfo(
    selectWeatherDto: SelectWeatherDto,
  ): Promise<WeatherEntity> {
    try {
      return this.weatherRepository.findOne(selectWeatherDto);
    } catch (err) {
      throw err;
    }
  }

  async getAllWeatherInfo(
    selectWeatherDto: SelectAllWeatherDto,
  ): Promise<WeatherEntity[]> {
    try {
      return this.weatherRepository.find(selectWeatherDto);
    } catch (err) {
      throw err;
    }
  }
}
