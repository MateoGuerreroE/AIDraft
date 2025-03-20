import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDTO, UserRecord } from 'src/data';
import { LoggingService, UserService } from 'src/services';
import { ApiResponse, ApplicationError } from 'src/types';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggingService,
  ) {}

  @Post('/create')
  async createUser(
    @Body() user: CreateUserDTO,
  ): Promise<ApiResponse<UserRecord>> {
    try {
      const result = await this.userService.createUserRecord(user);
      return { data: result };
    } catch (e) {
      if (e instanceof ApplicationError) {
        this.logger.debug(e.getMetadata());
        throw new HttpException(e.message, e.statusCode);
      }
      this.logger.error(e, 'Error creating user');
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
