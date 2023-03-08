import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from './weather/weather.module';
import ormconfig from './ormconfig';
import { LocalModule } from './local/local.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    WeatherModule,
    LocalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
