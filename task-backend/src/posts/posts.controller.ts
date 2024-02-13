import { Controller, Get, Post, Body, Param, Delete, Put, Logger, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ExecutionTime, LogExecutionTime } from 'src/utils/execution-time.decorator';
import { UserPost } from './userpost.entity';
import { User } from 'src/users/user.entity';
import { NewPostDto } from './dto/new-post.dto';

@LogExecutionTime()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get(':userId')
  async getUserPosts(
    @Param('userId') userId: number,
    @ExecutionTime() executionTime: { start: number },
  ) {
    const userPosts = await this.postsService.getUserPosts(userId);
    const duration = performance.now() - executionTime.start;
    Logger.log(`Execution time for getUserPosts: ${duration}ms`, 'PostsController');
    return userPosts;
  }

  //get all posts
  @Get()
  async findAll(): Promise<UserPost[]> {
    return await this.postsService.findall();
  }

  //get one post by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserPost> {
    const user = await this.postsService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      return user;
    }
  }

  @Post("new")
  async createNewPost(
    @ExecutionTime() executionTime: { start: number }, @Body() newPostDto: NewPostDto) {
    const duration = performance.now() - executionTime.start;
    const newPost = await this.postsService.createNewPost(newPostDto);
    Logger.log(`Execution time for getUserPosts: ${duration}ms`, 'PostsController');
    return newPost;
  }

  //update post
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<UserPost> {
    return this.postsService.update(id, user);
  }

  //delete post
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    //handle the error if user not found
    const user = await this.postsService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.postsService.delete(id);
  }
}
