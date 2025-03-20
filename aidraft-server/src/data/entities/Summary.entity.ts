import { SummaryType } from 'src/types';
import { generateId } from 'src/utils';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

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
}
