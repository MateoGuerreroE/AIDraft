import { Injectable } from '@nestjs/common';
import {
  AuthenticationService,
  UnauthorizedError,
  UserLoginResponse,
} from 'src/types';
import { ConfigService } from './Config.service';
import * as admin from 'firebase-admin';

import { LoggingService } from './Logging.service';
import { UserService } from './User.service';
import { JwtService } from '@nestjs/jwt';
import { UserRecord } from 'src/data';

@Injectable()
export class FireBaseAuthService implements AuthenticationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    if (!admin.apps.length) {
      const envCredentials = this.configService.getFirebaseConfig();
      const firebaseCredentials = {
        projectId: envCredentials.project_id,
        clientEmail: envCredentials.client_email,
        privateKey: envCredentials.private_key.replace(/\\n/g, '\n'),
      };
      admin.initializeApp({
        credential: admin.credential.cert(firebaseCredentials),
      });
      this.logger.debug(`Firebase Initialized`);
    }
  }

  async getEmailFromToken(token: string): Promise<string> {
    const firebaseUser = await admin.auth().verifyIdToken(token);
    return firebaseUser.email;
  }

  async getUserToken(user: UserRecord): Promise<string> {
    const payload = {
      sub: user.userId,
      email: user.emailAddress,
      firebaseId: user.firebaseId,
      fullName: `${user.firstName} ${user.lastName}`,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.getJwtSecret(),
      expiresIn: this.configService.getDefaultExpiration(),
    });
  }

  async loginUser(loginToken: string): Promise<UserLoginResponse> {
    try {
      const userEmail = await this.getEmailFromToken(loginToken);
      const existentUser = await this.userService.getUserByEmail(userEmail);
      const token = await this.getUserToken(existentUser);
      return {
        user: existentUser,
        token,
        loginToken,
        expiration: new Date(
          Date.now() + this.configService.getDefaultExpiration() * 1000,
        ).toISOString(),
      };
    } catch (e) {
      this.logger.debug(e);
      throw new UnauthorizedError('Invalid credentials', { reason: e });
    }
  }
}
