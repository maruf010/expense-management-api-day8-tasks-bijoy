/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../pages/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async signup(dto: any) {
    const ex = await this.users.findByEmail(dto.email);
    if (ex) throw new UnauthorizedException('Email already used');
    const user: any = await this.users.create(dto);
    const token = this.jwt.sign({
      sub: user._id.toString(),
      email: user.email,
    });
    return {
      accessToken: token,
      user: { _id: user._id, email: user.email, name: user.name },
    };
  }

  async login(dto: any) {
    const user: any = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({
      sub: user._id.toString(),
      email: user.email,
    });
    return {
      accessToken: token,
      user: { _id: user._id, email: user.email, name: user.name },
    };
  }
}
