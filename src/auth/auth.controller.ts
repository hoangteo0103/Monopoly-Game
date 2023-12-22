import { Controller, Post, UseGuards, Request, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  
    @UseGuards(AuthGuard('local'))
    @ApiResponse({
      status: 200,
      description: 'Login Successfully',
      type: User,
    })
    @Post('login')
    async login(@Request() req, @Res() res) {
      res.status(HttpStatus.OK).json(req.user);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto, @Res() res) {
    let user =  await this.authService.signUp(createUserDto);
    res.status(HttpStatus.OK).json(user);
  }

    @Get()
    async find() {
        return "HAHA"
    }
}
