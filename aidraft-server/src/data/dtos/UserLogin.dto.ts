import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  loginToken: string;
}
