import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeatherEntity } from '../entities/weather.entity';
import { SelectAllWeatherDto, SelectWeatherDto } from './dto/weather.dto';

describe('WeatherService', () => {
  let controller: WeatherController;
  let service: WeatherService;
  let weatherRepository: Repository<WeatherEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
    weatherRepository = module.get<Repository<WeatherEntity>>(
      getRepositoryToken(WeatherEntity),
    );
  });

  describe('getWeatherInfo', () => {
    it('should return weather information', async () => {
      const clientData: SelectWeatherDto = {
        area: 11,
        date: '20230302',
        time: 15,
      };
      const returnWeatherInfo: WeatherEntity =
      {
        id: 1,
        area: clientData.area,
        time: clientData.time,
        date: clientData.date,
        temperature: 12,
        precipitation: 0,
        precipitationPattern: 0,
        windSpeed: 0.2,
        windDirection: 340,
        humidity: 40,
      };
      jest.spyOn(service, 'getWeatherInfo').mockResolvedValue(returnWeatherInfo);

      const WeatherInfo = await controller.getWeatherInfo(clientData);

      expect(WeatherInfo).toEqual(returnWeatherInfo);
      expect(service.getWeatherInfo).toHaveBeenCalled();
    })
  });

  describe('getAllWeatherInfo', () => {
    it('should return weather information', async () => {
      const clientData: SelectAllWeatherDto = {
        date: '20230302',
        time: 15,
      };
      const returnWeatherInfo: WeatherEntity[] = [
        {
          id: 1,
          area: 1,
          time: clientData.time,
          date: clientData.date,
          temperature: 12,
          precipitation: 0,
          precipitationPattern: 0,
          windSpeed: 0.2,
          windDirection: 340,
          humidity: 40,
        },
        {
          id: 2,
          area: 2,
          time: clientData.time,
          date: clientData.date,
          temperature: 15,
          precipitation: 0,
          precipitationPattern: 0,
          windSpeed: 1.4,
          windDirection: 150,
          humidity: 35,
        },
        {
          id: 3,
          area: 3,
          time: clientData.time,
          date: clientData.date,
          temperature: 7,
          precipitation: 50,
          precipitationPattern: 3,
          windSpeed: 2.3,
          windDirection: 280,
          humidity: 60,
        }
      ]
      jest.spyOn(service, 'getAllWeatherInfo').mockResolvedValue(returnWeatherInfo);

      const WeatherInfo = await controller.getAllWeatherInfo(clientData);

      expect(WeatherInfo).toEqual(returnWeatherInfo);
      expect(service.getAllWeatherInfo).toHaveBeenCalled();
    })
  });
});
