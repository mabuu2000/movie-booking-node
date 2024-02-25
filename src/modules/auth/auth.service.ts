import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save user to db
    try {
      const user = await this.prisma.user.create({
        data: {
          userName: dto.userName,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
          dob: dto.dob,
          firstName: dto.firstName,
          lastName: dto.lastName,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken!');
        }
      }
    }
  }
  async signin(dto: { userName: string; password: string }) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        userName: dto.userName,
      },
    });
    // if user doesn't exist
    if (!user) throw new ForbiddenException('Email or username is incorrect');
    // compares password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrects, throw exception
    if (!pwMatches) throw new ForbiddenException('Password incorrect');
    // send back user
    return this.signToken(user.id, user.email);
  }
  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payLoad = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '3m',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
