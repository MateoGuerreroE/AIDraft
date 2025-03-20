import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserLoginDTO } from 'src/data';
import { LoggingService } from 'src/services';
import {
  ApiResponse,
  ApplicationError,
  AuthenticationService,
  UserLoginResponse,
} from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly logger: LoggingService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() body: UserLoginDTO,
  ): Promise<ApiResponse<UserLoginResponse>> {
    try {
      const userLogin = await this.authService.loginUser(body.loginToken);
      return { data: userLogin };
    } catch (e) {
      if (e instanceof ApplicationError) {
        this.logger.debug(e.getMetadata());
        throw new HttpException(e.message, e.statusCode);
      }
      this.logger.error(e, 'Error creating note');
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
