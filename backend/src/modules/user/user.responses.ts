import { createUnionType, Field, ObjectType } from "@nestjs/graphql";
import { BaseResponse } from "../../shared/base-response.interface";

@ObjectType()
export class UserSuccessResponse implements BaseResponse {
  readonly _typename: string = UserSuccessResponse.name;

  @Field()
  readonly message: string = "User successfully added.";
}

@ObjectType()
export class UserEmailTakenResponse implements BaseResponse {
  readonly _typename: string = UserEmailTakenResponse.name;

  @Field()
  readonly message: string = "User with this email already exists.";
}

export const AddUserResponse = createUnionType({
  name: "AddUserResponse",
  types: () => [UserSuccessResponse, UserEmailTakenResponse],
});


@ObjectType()
export class ActivationSuccessResponse implements BaseResponse {
  readonly _typename: string = ActivationSuccessResponse.name;

  @Field()
  readonly message: string = "User successfully activated.";
}

@ObjectType()
export class ActivationInvalidResponse implements BaseResponse {
  readonly _typename: string = ActivationInvalidResponse.name;

  @Field()
  readonly message: string = "User activation error.";
}

export const ActivateUserResponse = createUnionType({
  name: "ActivateUserResponse",
  types: () => [ActivationSuccessResponse, ActivationInvalidResponse],
});