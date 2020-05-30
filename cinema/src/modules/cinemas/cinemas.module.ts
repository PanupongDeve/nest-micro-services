import { Module } from '@nestjs/common';
import { CinemasController } from './cinemas.controller';

@Module({
  controllers: [CinemasController],
  providers: [],
})
export class CinemasModule {}