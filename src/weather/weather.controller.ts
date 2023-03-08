import { Body, Controller, Post, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { WeatherEntity } from 'src/entities/weather.entity';
import { SelectAllWeatherDto, SelectWeatherDto } from './dto/weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async getWeatherInfo(
    @Body() selectWeatherDto: SelectWeatherDto,
  ): Promise<WeatherEntity> {
    const weatherInfo: WeatherEntity = await this.weatherService.getWeatherInfo(selectWeatherDto);
    return weatherInfo;
  }

  @Post('/all')
  @UsePipes(ValidationPipe)
  async getAllWeatherInfo(
    @Body() selectWeatherDto: SelectAllWeatherDto,
  ): Promise<WeatherEntity[]> {
    const weatherInfo: WeatherEntity[] = await this.weatherService.getAllWeatherInfo(selectWeatherDto);
    return weatherInfo;
  }
}
