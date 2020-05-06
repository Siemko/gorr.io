import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";

const restricetedUrls = ["graphql", "404"];

@Injectable()
export class RestrictedSlugMiddleware implements NestMiddleware {
  use(req: Request, _, next: Function) {
    if (restricetedUrls.includes(req.params?.slug)) {
      next();
    }
    next();
  }
}
