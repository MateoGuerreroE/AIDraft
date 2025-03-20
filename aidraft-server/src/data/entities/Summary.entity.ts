import { SummaryType } from 'src/types';
import { generateId } from 'src/utils';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, default: null })
  customInstructions: string;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date;

  @BeforeInsert()
  generateId() {
    this.summaryId = generateId();
  }

  @ManyToOne(() => NoteRecord, (note) => note.summaries)
  note: NoteRecord;
}
