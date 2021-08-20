import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InstaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async FB(
    pathUrl: string,
    access_token: string,
    fields?: string,
    limit?: number,
  ) {
    let response;
    try {
      response = await this.httpService
        .get(
          `${this.configService.get('INSTA_BASE_URL')}${pathUrl}`,
          fields == null
            ? {
                params: {
                  access_token,
                },
              }
            : {
                params: {
                  fields,
                  limit: limit == null ? 0 : limit,
                  access_token,
                },
              },
        )
        .toPromise();
    } catch (error) {
      throw new NotFoundException(error);
    }
    response = response['data'];
    return response;
  }

  async getInstaUserData() {
    const fbPage = await this.FB(
      'me/accounts',
      this.configService.get('LONG_LIVE_ACCESS_TOKEN'),
    );
    const accountIds = await this.FB(
      fbPage.data[0].id,
      this.configService.get('LONG_LIVE_ACCESS_TOKEN'),
      'instagram_business_account',
    );
    const instaAccount = await this.FB(
      accountIds.instagram_business_account.id,
      this.configService.get('LONG_LIVE_ACCESS_TOKEN'),
      'biography,media_count,followers_count,follows_count,id,ig_id,name,username',
    );
    return instaAccount;
  }

  async getUserMedias(userId: string, limit: number) {
    const instaUserMedias = await this.FB(
      `${userId}/media`,
      this.configService.get('LONG_LIVE_ACCESS_TOKEN'),
      'comments_count,id,like_count,media_type,media_url,thumbnail_url,timestamp',
      limit,
    );
    return instaUserMedias;
  }

  async getUserStories(userId: string, limit: number) {
    const instaUserStories = await this.FB(
      `${userId}/stories`,
      this.configService.get('LONG_LIVE_ACCESS_TOKEN'),
      'thumbnail_url,comments_count,media_type,media_url,username,timestamp,caption,id,ig_id,like_count',
      limit,
    );
    return instaUserStories;
  }
}
