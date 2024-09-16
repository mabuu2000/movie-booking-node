import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from '@prisma/client';
import { CreateMovieDto } from './dto/movie.dto';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createMovie(dto: CreateMovieDto, userToken: string): Promise<Movie> {
    try {
      if (!userToken) {
        throw new UnauthorizedException('JWT token missing');
      }

      this.jwtService.verify(userToken);
      const releaseDate = new Date(dto.releaseDate);

      return await this.prisma.movie.create({
        data: {
          id: dto.id,
          description: dto.description,
          trailer: dto.trailer,
          ongoing: dto.ongoing,
          rating: dto.rating,
          releaseDate,
          poster: dto.poster,
          title: dto.title,
          genre: dto.genre,
        },
      });
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException(
          'Invalid or expired authentication token',
        );
      } else if (error.code === 'P2002') {
        throw new BadRequestException(
          'Duplicate movieId or other validation error.',
        );
      } else {
        throw error;
      }
    }
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }
}
