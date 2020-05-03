import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { LoginResponse } from "./auth.responses";

@Resolver("Auth")
export class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args("input") input: LoginInput): Promise<typeof LoginResponse> {
    return this.authService.login(input);
  }
}
