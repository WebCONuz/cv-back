import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization?.split(' ')?.[1];
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_KEY,
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
