import { InputType, Field } from "@nestjs/graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsUrl,
  IsOptional,
} from "class-validator";

@InputType()
export class AddLinkInput {
  @Field()
  @IsUrl()
  @IsNotEmpty()
  target: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  slug?: string;
}
