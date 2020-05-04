import { Controller, Get, Param, Redirect, Req } from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";
import { SlugParams } from "./modules/link/dto/slug.params";
import { LinkService } from "./modules/link/link.service";
import { protocolRegex } from "./shared/protocol.regex";
import { getRealIp } from "./shared/real-ip.util";

@Controller()
export class AppController {
  constructor(
    private readonly linkService: LinkService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/:slug")
  @Redirect("https://gorrion.io", 302)
  async redirect(@Param() params: SlugParams, @Req() request: Request) {
    const ip = getRealIp(request);
    const { target } = await this.linkService.findBySlug(params);

    const targetLink = protocolRegex.test(target) ? target : `//${target}`;
    return { url: targetLink };
  }
}
