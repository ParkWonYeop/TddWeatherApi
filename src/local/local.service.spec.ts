import { Test, TestingModule } from '@nestjs/testing';
import { LocalService } from './local.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { LocalEntity } from '../entities/local.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocalDto } from './dto/local.dto';

describe('LocalService', () => {
  let service: LocalService;
  let localRepository: Repository<LocalEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalService,
        {
          provide: getRepositoryToken(LocalEntity),
          useValue: {
            find: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LocalService>(LocalService);
    localRepository = module.get<Repository<LocalEntity>>(
      getRepositoryToken(LocalEntity),
    );
  });

  describe('getLocalInfo', () => {
    it('should return local information', async () => {
      const returnLocalInfo: LocalEntity[] = [
        {
          id: 1,
          area_code: 11,
          county: '서울',
          city: '종로구',
          grid_x: 60,
          grid_y: 127,
          longitude: 37.5720164,
          latitude: 126.9794068,
        },
        {
          id: 2,
          area_code: 12,
          county: '서울',
          city: '중구',
          grid_x: 62,
          grid_y: 125,
          longitude: 37.563656,
          latitude: 126.9972477,
        },
        {
          id: 3,
          area_code: 13,
          county: '서울',
          city: '용산구',
          grid_x: 59,
          grid_y: 128,
          longitude: 37.5327686,
          latitude: 126.9903127,
        },
      ];
      jest.spyOn(localRepository, 'find').mockResolvedValue(returnLocalInfo);

      const localInfo = await service.getLocalInfo();

      expect(localInfo).toEqual(returnLocalInfo);
      expect(localRepository.find).toHaveBeenCalled();
    });
  });

  describe('getCityInfo', () => {
    it('should return city information', async () => {
      const clientData: LocalDto = { county: '서울' };
      const returnCityInfo: LocalEntity[] = [
        {
          id: 1,
          area_code: 11,
          county: '서울',
          city: '종로구',
          grid_x: 60,
          grid_y: 127,
          longitude: 37.5720164,
          latitude: 126.9794068,
        },
        {
          id: 2,
          area_code: 12,
          county: '서울',
          city: '중구',
          grid_x: 62,
          grid_y: 125,
          longitude: 37.563656,
          latitude: 126.9972477,
        },
        {
          id: 3,
          area_code: 13,
          county: '서울',
          city: '용산구',
          grid_x: 59,
          grid_y: 128,
          longitude: 37.5327686,
          latitude: 126.9903127,
        },
      ];
      jest.spyOn(localRepository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(returnCityInfo),
      } as unknown as SelectQueryBuilder<LocalEntity>);

      const cityInfo = await service.getCityInfo(clientData);

      expect(cityInfo).toEqual(returnCityInfo);
      expect(localRepository.createQueryBuilder).toHaveBeenCalled();
    });
    it('should throw error when database error', async () => {
      const clientData: LocalDto = { county: '서울' };
      jest.spyOn(localRepository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getRawMany: jest
          .fn()
          .mockRejectedValue(new Error('Database query error')),
      } as unknown as SelectQueryBuilder<LocalEntity>);

      await expect(service.getCityInfo(clientData)).rejects.toThrow(
        new Error('Database query error'),
      );
    });
  });
})
