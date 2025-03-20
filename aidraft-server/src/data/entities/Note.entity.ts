import { generateId } from 'src/utils';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

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
}
