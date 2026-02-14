import { Controller, Get, Param, NotFoundException, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create_user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
      return req.user;
    }

  @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: number) {
      const user = await this.userService.findOneById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

  @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      const user = await this.userService.create(createUserDto);
      return user;
    } 
}
