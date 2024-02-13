import { HttpService } from '@nestjs/axios';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewPostDto } from 'src/posts/dto/new-post.dto';
import { PostsService } from 'src/posts/posts.service';
import { UserPost } from 'src/posts/userpost.entity';
import { User } from 'src/users/user.entity';
import { LoggingInterceptor } from 'src/utils/logging.interceptor';
import { Repository } from 'typeorm';

@Injectable()
@UseInterceptors(LoggingInterceptor)
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // @InjectRepository(UserPost)
    // private UserPostRepository: Repository<UserPost>,

    private readonly postsService: PostsService,

    private readonly httpService: HttpService,
  ) { }

  // async getUsers() {
  //   return this.httpService.get('https://jsonplaceholder.typicode.com/users')
  //      .pipe(map((response) => response.data.map(({ id, name, email, company }) => ({ id, name, email, companyName: company.name }))),)
  //     ;
  // }
  async getUsers(): Promise<any> {
    // use the httpService to send a GET request to the URL
    return this.httpService.get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(
          (response) => response.data.map(
            ({ id, name, email, company }) => ({ id, name, email, companyName: company.name }))),);
  }


  async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }
  // get all users
  async findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  //get one user
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  //create user
  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    const newUserPost = await this.createUserPost(newUser, user.posts[0]);

    newUser.posts = [newUserPost];
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async createUserPost(user: User, postDto: any) {
    const newUserPost = new NewPostDto();
    newUserPost.title = postDto.title;
    newUserPost.body = postDto.body;
    newUserPost.user = user;

    return await this.postsService.createNewPost(newUserPost);
  }


  // update user
  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  // delete user
  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
