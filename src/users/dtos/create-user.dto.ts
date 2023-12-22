
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'hoangteo' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Hoang' })
  name: string;
}
