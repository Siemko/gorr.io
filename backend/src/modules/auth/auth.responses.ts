import { Field, ObjectType, createUnionType } from "@nestjs/graphql";
import { BaseResponse } from "../../shared/base-response.interface";

@ObjectType()
export class LoginSuccessResponse {
  readonly _typename: string = "LoginSuccessResponse";

  @Field()
  token: string;

  @Field()
  expiryDate: Date;

  @Field()
  email: string;

  @Field()
  userId: number;

  constructor({
    token,
    expiryDate,
    email,
    id,
  }: {
    token: string;
    expiryDate: Date;
    email: string;
    id: number;
  }) {
    this.token = token;
    this.expiryDate = expiryDate;
    this.userId = id;
    this.email = email;
  }
}

@ObjectType()
export class LoginInvalidResponse implements BaseResponse {
  readonly _typename: string = "LoginInvalidResponse";

  @Field()
  readonly message: string = "Invalid email or password.";
}

@ObjectType()
export class LoginUserInactiveResponse implements BaseResponse {
  readonly _typename: string = "LoginUserInactiveResponse";

  @Field()
  readonly message: string = "User is inactive.";
}

export const LoginResponse = createUnionType({
  name: "LoginResponse",
  types: () => [
    LoginSuccessResponse,
    LoginInvalidResponse,
    LoginUserInactiveResponse,
  ],
});
