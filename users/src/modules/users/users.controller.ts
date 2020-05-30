import { Controller, Get, Post, Req, Request, HttpCode, Param, Put, Patch, Body, Delete } from '@nestjs/common';
import { User } from '../../core/entities/users/User';
import { usersPresenter } from '../../core/useCases/users/UsersPresenter';
import { usersCreator } from '../../core/useCases/users/UsersCreator';
import {
  HttpResponse
} from '../../core/HttpResponse/HttpResponse';

@Controller('v1/users')
export class UsersController {
  constructor() {}

  @Get()
  async getUsers(): Promise<HttpResponse<User[]>> {
    const response = await usersPresenter.getUsers();

    return response;
  }

  @Get(':id')
  async getUsersById(@Param('id') id): Promise<HttpResponse<User>> {
    const response = await usersPresenter.getUserById(id);
    return response;
  }

  @Post()
  async createUser(@Body() body): Promise<HttpResponse<string>> {
    
    const response = await usersCreator.createUser(body);

    return response;
  }

  @Patch(':id')
  async updateUser(@Body() body, @Param('id') id): Promise<HttpResponse<string>> {
    const response = await usersCreator.updateUser(id, body);
    return response;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id): Promise<HttpResponse<string>> {
    const response = await usersCreator.deleteUser(id);

    return response;
  }
}
