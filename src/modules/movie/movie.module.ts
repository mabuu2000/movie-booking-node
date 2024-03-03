import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserController } from '../user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120m' },
    }),
  ],
  controllers: [MovieController, UserController],
  providers: [MovieService],
})
export class MovieModule {}
