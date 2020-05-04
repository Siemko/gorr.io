import { Controller, Get, Param, Redirect, Req, Next } from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";
import { SlugParams } from "./modules/link/dto/slug.params";
import { Link } from "./modules/link/link.entity";
import { LinkService } from "./modules/link/link.service";
import { VisitService } from "./modules/visit/visit.service";
import { protocolRegex } from "./shared/protocol.regex";
import { getRealIp } from "./shared/real-ip.util";

@Controller()
export class AppController {
  constructor(
    private readonly linkService: LinkService,
    private readonly visitService: VisitService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/:slug")
  @Redirect("https://gorrion.io", 302)
  async redirect(
    @Param() params: SlugParams,
    @Req() request: Request,
    @Next() next,
  ) {
    if (params.slug === "graphql") return await next();
    const foundLink: Link = await this.linkService.findBySlug(params);
    if (foundLink) {
      this.visitService.queueVisit({
        link: foundLink,
        userAgentHeader: request.headers["user-agent"],
        realIp: getRealIp(request),
        referer: request.headers["referer"],
      });
      const targetLink = protocolRegex.test(foundLink.target)
        ? foundLink.target
        : `//${foundLink.target}`;
      return { url: targetLink };
    }
  }
}
