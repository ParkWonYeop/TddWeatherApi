import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from './weather/weather.module';
import ormconfig from './ormConfig/ormconfig';
import { LocalModule } from './local/local.module';
import { ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    WeatherModule,
    LocalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
