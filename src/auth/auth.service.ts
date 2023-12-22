import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User does not exist');
    console.log(email, pass, user)
    const passwordMatches = await argon2.verify(user.password, pass);
    console.log(email, pass, user)
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const { password, ...result } = user;
    console.log(result)
    return result;
  }

  generatePassword() {
    let length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    createUserDto.username = (createUserDto.name)
      .toLocaleLowerCase()
      .replace(/\s/g, '');
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    createUserDto.password = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto
    });

    console.log(newUser)
    return newUser;
  }
}