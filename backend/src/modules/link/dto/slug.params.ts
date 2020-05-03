import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class SlugParams {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  slug: string;
}
