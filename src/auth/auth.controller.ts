/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Res,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request as ExRequest, Response } from 'express';
import { IUser } from 'src/users/users.interface';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('User Login')
  handleLogin(@Request() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }
  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage('Get user information')
  @Get('/account')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }

  @Public()
  @ResponseMessage('Get user by refresh token')
  @Get('/refresh')
  handleRefreshToken(@Req() request: ExRequest, @Res({ passthrough: true }) response: Response) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }
  
  @ResponseMessage('Logout User')
  @Get('/logout')
  handleLogout (@Res({ passthrough: true }) response: Response, @User() user: IUser) {
    return this.authService.logout(response, user)
  }
}
