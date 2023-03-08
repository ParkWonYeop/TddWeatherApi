import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('local_information')
export class LocalEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  area_code: number;

  @Column({ length: 30 })
  county: string;

  @Column({ length: 30 })
  city: string;

  @Column({ type: 'int' })
  grid_x: number;

  @Column({ type: 'int' })
  grid_y: number;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'double' })
  latitude: number;
}
