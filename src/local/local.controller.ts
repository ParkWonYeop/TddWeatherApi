import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { LocalEntity } from '../entities/local.entity';
import { LocalDto } from './dto/local.dto';
import { LocalService } from './local.service';

@Controller('local')
export class LocalController {
  constructor(private localService: LocalService) {
    this.localService = localService;
  }

  @Get('/all')
  async getLocalInfo(): Promise<LocalEntity[]> {
    const localInfo: LocalEntity[] = await this.localService.getLocalInfo();
    return localInfo;
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async getCityInfo(
    @Body() localDto: LocalDto,
  ): Promise<LocalEntity[]> {
    const localInfo: LocalEntity[] = await this.localService.getCityInfo(localDto);
    return localInfo;
  }
}
