import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email khong duoc de trong',
  })
  email: string;

  @IsNotEmpty()
  password: string;
  name: string;
  address: string;
}
