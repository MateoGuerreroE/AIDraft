import { generateId } from 'src/utils';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
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
}
