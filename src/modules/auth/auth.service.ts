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
      const token = await this.signToken(user.id, user.email);
      return {
        meaningful_msg: 'Signed up successfully',
        access_token: token.access_token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken!');
        }
      }
    }
  }
  async signin(dto: { username: string; password: string }) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        userName: dto.username,
      },
    });
    // if user doesn't exist
    if (!user) throw new ForbiddenException('Username is incorrect');
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
  ): Promise<{ access_token: string; meaningful_msg: string }> {
    const payLoad = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '120m',
      secret: secret,
    });
    return {
      meaningful_msg: 'Signed in successfully',
      access_token: token,
    };
  }
}
