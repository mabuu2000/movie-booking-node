import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto';
import { Movie } from '@prisma/client';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  createMovie(
    @Body() dto: CreateMovieDto,
    @Headers('Authorization') userToken: string,
  ) {
    return this.movieService.createMovie(dto, userToken);
  }

  @Get('get-movie')
  getAllMovies(): Promise<Movie[]> {
    return this.movieService.getAllMovies();
  }
}
