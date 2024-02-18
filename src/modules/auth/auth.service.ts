import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);
    //save user to db
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
    delete user.hash;
    return user;
  }
}
