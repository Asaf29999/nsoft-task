import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PostsService } from 'src/posts/posts.service';
import { UserPost } from 'src/posts/userpost.entity';

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([UserPost])],
    controllers: [UsersController],
    providers: [UsersService, PostsService]
})
export class UsersModule { }
// @Module({
//     imports: [HttpModule, TypeOrmModule.forFeature([User])],
//     controllers: [UsersController],
//     providers: [UsersService
//         // {
//         //     provide: APP_INTERCEPTOR,
//         //     useClass: LoggingInterceptor,
//         // }
//     ],
// })