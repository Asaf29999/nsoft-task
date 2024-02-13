import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';

export class NewPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  user: User;;
}