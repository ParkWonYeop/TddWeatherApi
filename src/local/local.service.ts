import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalEntity } from '../entities/local.entity';
import { Repository } from 'typeorm/index';
import { LocalDto } from './dto/local.dto';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(LocalEntity)
    private localRepository: Repository<LocalEntity>,
  ) { }

  async getLocalInfo(): Promise<LocalEntity[]> {
    try {
      const localInfo = await this.localRepository.find();
      return localInfo;
    } catch (err) {
      throw err;
    }
  }

  async getCityInfo(localDto: LocalDto): Promise<LocalEntity[]> {
    try {
      const cityInfo = await this.localRepository
        .createQueryBuilder()
        .where('county IN (:county)', { county: localDto.county })
        .getRawMany<LocalEntity>();
      return cityInfo;
    } catch (err) {
      throw err;
    }
  }
}
