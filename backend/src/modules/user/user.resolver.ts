import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../../shared/current-user.decorator";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { AddUserInput } from "./dto/add-user.input";
import { User } from "./user.entity";
import { ActivateUserResponse, AddUserResponse } from "./user.responses";
import { UserService } from "./user.service";
import { TokenPayload } from "../../shared/token-payload.interface";

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Mutation(() => ActivateUserResponse)
  async activate(
    @Args("token") token: string,
  ): Promise<typeof ActivateUserResponse> {
    return this.userService.activateUser(token);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() currentUser: TokenPayload): Promise<User> {
    return this.userService.findByEmail(currentUser.email);
  }

  @Mutation(() => AddUserResponse)
  async addUser(
    @Args("input") input: AddUserInput,
  ): Promise<typeof AddUserResponse> {
    return this.userService.addUser(input);
  }
}
