import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum FileType {
  IMAGE = 'image',
}

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  fileName: string;

  @Column({
    type: 'enum',
    enum: FileType,
    default: null,
  })
  type: FileType;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  size: number;

  @CreateDateColumn()
  creationDate: Date;
}
