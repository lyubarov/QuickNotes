import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  constructor(id: number, email: string, token: string | undefined) {
    this.id = id;
    this.email = email;
    this.token = token;
  }

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  token?: string;
}
