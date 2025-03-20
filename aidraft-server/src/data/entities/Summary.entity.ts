import { SummaryType } from 'src/types';
import { generateId } from 'src/utils';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { NoteRecord } from './Note.entity';

@Entity('Summary')
export class SummaryRecord {
  @PrimaryColumn()
  summaryId: string;

  @Column({ type: 'enum', enum: SummaryType })
  type: SummaryType;

  @Column({ type: 'text' })
  body: string;

  @BeforeInsert()
  generateId() {
    this.summaryId = generateId();
  }

  @ManyToOne(() => NoteRecord, (note) => note.summaries)
  note: NoteRecord;
}
