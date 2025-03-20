import { generateId } from 'src/utils';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { NoteRecord } from './Note.entity';

@Entity('User')
export class UserRecord {
  @PrimaryColumn()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  emailAddress: string;

  @Column()
  firebaseId: string;

  @BeforeInsert()
  generateId() {
    this.userId = generateId();
  }

  @OneToMany(() => NoteRecord, (note) => note.user)
  notes: NoteRecord[];
}
