import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthUser } from 'src/types';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IAuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
