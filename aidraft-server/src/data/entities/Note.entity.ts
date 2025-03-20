import { generateId } from 'src/utils';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserRecord } from './User.entity';
import { SummaryRecord } from './Summary.entity';

@Entity('Note')
export class NoteRecord {
  @PrimaryColumn()
  noteId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @BeforeInsert()
  generateId() {
    this.noteId = generateId();
  }

  @DeleteDateColumn({ default: null, nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UserRecord, (user) => user.notes)
  user: UserRecord;

  @OneToMany(() => SummaryRecord, (summary) => summary.note)
  summaries: SummaryRecord[];
}
