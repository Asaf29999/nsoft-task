import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPost } from './userpost.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserPost])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }