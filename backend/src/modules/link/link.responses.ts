import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { BaseResponse } from "../../shared/base-response.interface";

@ObjectType()
export class LinkSuccessResponse implements BaseResponse {
  readonly _typename: string = LinkSuccessResponse.name;

  @Field()
  readonly message: string = "Link successfully added.";

  @Field()
  readonly link: string;

  constructor(link: string) {
    this.link = link;
  }
}

@ObjectType()
export class LinkSlugTakenResponse implements BaseResponse {
  readonly _typename: string = LinkSlugTakenResponse.name;

  @Field()
  readonly message: string = "Link with this slug already exists.";
}

export const AddLinkResponse = createUnionType({
  name: "AddLinkResponse",
  types: () => [LinkSuccessResponse, LinkSlugTakenResponse],
});
