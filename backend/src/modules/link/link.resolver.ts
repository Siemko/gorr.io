import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../../shared/current-user.decorator";
import { TokenPayload } from "../../shared/token-payload.interface";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { AddLinkInput } from "./dto/add-link.input";
import { Link } from "./link.entity";
import { AddLinkResponse } from "./link.responses";
import { LinkService } from "./link.service";

@Resolver(() => Link)
export class LinkResolver {
  constructor(
    @Inject(LinkService)
    private readonly linkService: LinkService,
  ) {}

  @Mutation(() => AddLinkResponse)
  @UseGuards(GqlAuthGuard)
  async addLink(
    @Args("input") input: AddLinkInput,
    @CurrentUser() currentUser: TokenPayload,
  ): Promise<typeof AddLinkResponse> {
    return this.linkService.addLink(input, currentUser.email);
  }
}
