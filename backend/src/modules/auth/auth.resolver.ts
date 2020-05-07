import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { LoginResponse, TokenRefreshResponse } from "./auth.responses";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CurrentUser } from "../../shared/current-user.decorator";
import { TokenPayload } from "../../shared/token-payload.interface";

@Resolver("Auth")
export class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args("input") input: LoginInput): Promise<typeof LoginResponse> {
    return this.authService.login(input);
  }

  @Mutation(() => TokenRefreshResponse)
  @UseGuards(GqlAuthGuard)
  async refresh(@CurrentUser() currentUser: TokenPayload): Promise<typeof TokenRefreshResponse> {
    return this.authService.refreshToken(currentUser);
  }
}
