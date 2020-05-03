import { Controller, Get, Param, Redirect } from "@nestjs/common";
import { AppService } from "./app.service";
import { SlugParams } from "./modules/link/dto/slug.params";
import { LinkService } from "./modules/link/link.service";

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
  async redirect(@Param() params: SlugParams) {
    const { target } = await this.linkService.findBySlug(params);
    const protoRegex = new RegExp(/^https?:\/\//)
    const targetLink = protoRegex.test(target) ? target : `//${target}`
    return { url: targetLink };
  }
}
