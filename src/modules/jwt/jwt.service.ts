import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class JwtTokenService {
  public constructor(private readonly jwtService: JwtService) {}

  public issue(id: string) {
    return this.jwtService.sign(id);
  }

  public decode(jwt) {
    return this.jwtService.decode(jwt);
  }

  public verify(token: string): boolean {
    try {
      this.jwtService.verify(token);

      return true;
    } catch (e) {
      // console.log('e --->', e);
      return false;
    }
  }
}
