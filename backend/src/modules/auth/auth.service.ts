import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { addDays } from "date-fns";
import { TokenPayload } from "../../shared/token-payload.interface";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import {
  LoginInvalidResponse,
  LoginSuccessResponse,
  LoginUserInactiveResponse,
  TokenRefreshFailureResponse,
  TokenRefreshSuccessResponse,
} from "./auth.responses";
import { LoginInput } from "./dto/login.input";
export enum AuthCheckResponseType {
  SUCCESS = "SUCCESS",
  INVALID = "INVALID",
  USER_INACTIVE = "USER_INACTIVE",
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    user: User,
    password: string,
  ): Promise<AuthCheckResponseType> {
    if (user && (await verify(user.password, password))) {
      if (!user.isActive) return AuthCheckResponseType.USER_INACTIVE;
      return AuthCheckResponseType.SUCCESS;
    }
    return AuthCheckResponseType.INVALID;
  }

  async login(
    dto: LoginInput,
  ): Promise<
    LoginSuccessResponse | LoginInvalidResponse | LoginUserInactiveResponse
  > {
    const user = await this.userService.findByEmail(dto.email);
    const status = await this.validateUser(user, dto.password);
    switch (status) {
      case AuthCheckResponseType.USER_INACTIVE:
        return new LoginUserInactiveResponse();
      case AuthCheckResponseType.SUCCESS:
        const payload: TokenPayload = { email: user.email, sub: user.id };
        return new LoginSuccessResponse({
          token: this.jwtService.sign(payload),
          email: user.email,
          expiryDate: addDays(new Date(), 7),
          id: user.id,
        });
      default:
        return new LoginInvalidResponse();
    }
  }

  async refreshToken(
    dto: TokenPayload,
  ): Promise<TokenRefreshSuccessResponse | TokenRefreshFailureResponse> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) return new TokenRefreshFailureResponse();
    if (user.isActive) {
      const payload: TokenPayload = { email: user.email, sub: user.id };
      return new TokenRefreshSuccessResponse({
        token: this.jwtService.sign(payload),
        email: user.email,
        expiryDate: addDays(new Date(), 7),
        id: user.id,
      });
    }
    return new TokenRefreshFailureResponse();
  }
}
