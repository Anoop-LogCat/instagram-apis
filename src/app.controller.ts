import { InstaService } from '@app/insta';
import { Controller, Get, Param, Query } from '@nestjs/common';
@Controller('instagram')
export class AppController {
  constructor(private readonly instaService: InstaService) {}

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

  @Get('media/:id')
  async getMediaById(@Param('id') mediaId: string) {
    return await this.instaService.getMediaById(mediaId);
  }
}
