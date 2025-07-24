import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile } from 'passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('SERVER_URL') + '/auth/google/callback';

    if (!clientID || !clientSecret) {
      throw new Error('Missing Google credentials');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const { displayName, emails, photos } = profile;

    const user = {
      email: emails?.[0]?.value ?? null,
      name: displayName,
      picture: photos?.[0]?.value ?? null,
    };

    done(null, user);
  }
}
