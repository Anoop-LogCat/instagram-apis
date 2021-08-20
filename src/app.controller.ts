import { InstaService } from '@app/insta';
import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
@Controller('instagram')
export class AppController {
  constructor(private readonly instaService: InstaService) {}

  @Get('auth/callback')
  async authCallback() {
    return 'executed callback';
  }

  @Get('user')
  async getUserData() {
    return await this.instaService.getInstaUserData();
  }

  @Get('user/:id/medias')
  async getUserMedias(@Param('id') userId: string, @Query('limit') limit) {
    return await this.instaService.getUserMedias(userId, parseInt(limit));
  }

  @Get('user/:id/stories')
  async getUserStories(@Param('id') userId: string, @Query('limit') limit) {
    return await this.instaService.getUserStories(userId, parseInt(limit));
  }
}
