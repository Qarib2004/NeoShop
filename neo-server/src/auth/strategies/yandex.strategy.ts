import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile } from 'passport'
import { Strategy } from 'passport-yandex'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('YANDEX_CLIENT_ID');
    const clientSecret = configService.get<string>('YANDEX_CLIENT_SECRET');
    const callbackURL = configService.get<string>('SERVER_URL') + '/auth/yandex/callback';

    if (!clientID || !clientSecret) {
      throw new Error('Missing Yandex credentials');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any
  ) {
    const { username, emails, photos } = profile;

    const user = {
      email: emails?.[0]?.value ?? null,
      name: username,
      picture: photos?.[0]?.value ?? null,
    };

    done(null, user);
  }
}
