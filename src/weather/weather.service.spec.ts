import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { LocalEntity } from '../entities/local.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WeatherEntity } from '../entities/weather.entity';
import { SelectWeatherDto, SelectAllWeatherDto } from './dto/weather.dto';

describe('WeatherService', () => {
  let service: WeatherService;
  let weatherRepository: Repository<WeatherEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

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
      jest
        .spyOn(weatherRepository, 'findOne')
        .mockResolvedValue(returnWeatherInfo);

      const weatherInfo = await service.getWeatherInfo(clientData);

      expect(weatherInfo).toEqual(returnWeatherInfo);
      expect(weatherRepository.findOne).toHaveBeenCalled();
    });
    it('should throw error when database error', async () => {
      const clientData: SelectWeatherDto = {
        area: 11,
        date: '20230302',
        time: 15,
      };

      jest.spyOn(weatherRepository, 'findOne').mockRejectedValue(new Error('Database error')),

        await expect(service.getWeatherInfo(clientData)).rejects.toThrow(
          new Error('Database error'),
        );
    });
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
      jest
        .spyOn(weatherRepository, 'find')
        .mockResolvedValue(returnWeatherInfo);

      const weatherInfo = await service.getAllWeatherInfo(clientData);

      expect(weatherInfo).toEqual(returnWeatherInfo);
      expect(weatherRepository.find).toHaveBeenCalled();
    });
    it('should throw error when database error', async () => {
      const clientData: SelectAllWeatherDto = {
        date: '20230302',
        time: 15,
      };

      jest.spyOn(weatherRepository, 'find').mockRejectedValue(new Error('Database error')),

        await expect(service.getAllWeatherInfo(clientData)).rejects.toThrow(
          new Error('Database error'),
        );
    });
  });
})
