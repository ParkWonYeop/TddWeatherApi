import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm/index';

@Unique(['date', 'time', 'area'])
@Entity('weather_info')
export class WeatherEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'int' })
  area: number;

  @Column({ length: 10 })
  date: string;

  @Column({ type: 'int' })
  time: number;

  @Column({ type: 'int' })
  temperature: number;

  @Column({ type: 'int' })
  precipitation: number;

  @Column({ type: 'int' })
  precipitationPattern: number;

  @Column({ type: 'double' })
  windSpeed: number;

  @Column({ type: 'double' })
  windDirection: number;

  @Column({ type: 'double' })
  humidity: number;
}
