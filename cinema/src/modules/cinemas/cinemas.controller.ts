import { Controller, Get, Post, Req, Request, HttpCode, Param, Put, Patch, Body, Delete } from '@nestjs/common';
import { Cinema } from '../../core/entities/cinemas/Cinema';
import { cinemasPresentor } from '../../core/useCases/cinemas/CinemasPresenter';
import { cinemasCreator } from '../../core/useCases/cinemas/CinemasCreator';
import {
  HttpResponse
} from '../../core/HttpResponse/HttpResponse';

@Controller('v1/cinemas')
export class CinemasController {
  constructor() {}

  @Get()
  async getCinemas(): Promise<HttpResponse<Cinema[]>> {
    const response = await cinemasPresentor.getCinemas()

    return response;
  }

  @Get(':id')
  async getCinemasById(@Param('id') id): Promise<HttpResponse<Cinema>> {
    const response = await cinemasPresentor.getCinemaById(id);
    return response;
  }

  @Post()
  async createUser(@Body() body): Promise<HttpResponse<string>> {
    
    const response = await cinemasCreator.createCinema(body);

    return response;
  }

  @Patch(':id')
  async updateUser(@Body() body, @Param('id') id): Promise<HttpResponse<string>> {
    const response = await cinemasCreator.updateCinema(id, body);
    return response;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id): Promise<HttpResponse<string>> {
    const response = await cinemasCreator.deleteCinema(id);

    return response;
  }
}
