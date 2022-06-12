import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SeedingLogEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  key: string;

  @CreateDateColumn()
  creationDate: Date;
}
