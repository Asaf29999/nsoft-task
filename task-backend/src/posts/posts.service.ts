import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map } from 'rxjs/operators';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UserPost } from './userpost.entity';
import { NewPostDto } from './dto/new-post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(UserPost)
    public postsRepository: Repository<UserPost>,
    //private usersRepository: Repository<User>,
    private readonly httpService: HttpService
  ) { }

  async getUserPosts(userId: number): Promise<any> {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  async createPost(userId: number, userPost: UserPost): Promise<UserPost> {
    const user = { id: userId };
    const newPost = this.postsRepository.create({ ...userPost, user });
    return this.postsRepository.save(newPost);
  }

  async createNewPost(newPostDto: NewPostDto): Promise<UserPost> {
    const { title, body, user } = newPostDto;
    // const user = await this.usersRepository.findOneBy({ id: userId });

    const newPost = this.postsRepository.create({ ...newPostDto, user });
    return this.postsRepository.save(newPost);
  }
  // const newPost = this.postsRepository.create(newPostDto);

  async getPostsByUserId(userId: number): Promise<UserPost[]> {
    return this.postsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<UserPost> {
    return this.postsRepository.findOneBy({ id: id });
  }

  async findall(): Promise<UserPost[]> {
    return await this.postsRepository.find();
  }

  async update(id: number, updatePostDto: Partial<UserPost>): Promise<UserPost> {
    await this.postsRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
