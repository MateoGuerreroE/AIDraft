import { UserRecord } from 'src/data';

export interface ApiResponse<T> {
  data: T;
}

export interface UserLoginResponse {
  user: UserRecord;
  loginToken: string;
  token: string;
  expiration: string;
}
