import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: { id: true, email: true, createdAt: true },
    });
    return new UserResponseDto(user.id, user.email, undefined);
  }

  async login(loginDto: LoginDto): Promise<UserResponseDto> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, email: user.email };
      return new UserResponseDto(
        user.id,
        user.email,
        this.jwtService.sign(payload),
      );
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUser(payload: any): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: payload.sub } });
  }
}
