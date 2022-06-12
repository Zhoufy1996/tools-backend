import { UserRole } from './core/entities/user';

export interface JwtPayload {
  username: string;
  id: number;
  role: UserRole;
}

export interface JwtReq {
  user: JwtPayload;
}
