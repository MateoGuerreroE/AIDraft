import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRecord } from 'src/data';
import { CreateUserDTO } from 'src/data/dtos/CreateUser.dto';
import { NotFoundError } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRepository: Repository<UserRecord>,
  ) {}

  async getUserById(userId: string): Promise<UserRecord> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserRecord> {
    const user = await this.userRepository.findOne({
      where: { emailAddress: email },
      relations: ['notes'],
    });
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }

  async createUserRecord(userAttributes: CreateUserDTO): Promise<UserRecord> {
    const userInstance = this.userRepository.create(userAttributes);
    return this.userRepository.save(userInstance);
  }
}
