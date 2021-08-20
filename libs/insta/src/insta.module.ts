import { Module } from '@nestjs/common';
import { InstaService } from './insta.service';

@Module({
  providers: [InstaService],
  exports: [InstaService],
})
export class InstaModule {}
