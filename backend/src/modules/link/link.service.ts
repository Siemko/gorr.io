import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { customAlphabet } from "nanoid";
import { DeepPartial, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { AddLinkInput } from "./dto/add-link.input";
import { SlugParams } from "./dto/slug.params";
import { Link } from "./link.entity";
import { LinkSlugTakenResponse, LinkSuccessResponse } from "./link.responses";

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async findBySlug(params: SlugParams) {
    return this.linkRepository.findOne({
      where: {
        slug: params.slug,
      },
    });
  }

  async addLink(
    dto: AddLinkInput,
    userEmail: string,
  ): Promise<LinkSuccessResponse | LinkSlugTakenResponse> {
    const user = await this.userService.findByEmail(userEmail);
    const hasOwnSlug = dto.slug != null;
    if (hasOwnSlug) {
      const existingLink = await this.linkRepository.findOne({
        where: {
          slug: dto.slug,
        },
      });

      if (existingLink != null) {
        return new LinkSlugTakenResponse();
      }
    }

    const slug = hasOwnSlug ? dto.slug : await this.generateId();

    const newLink: DeepPartial<Link> = {
      slug,
      user,
      target: dto.target,
      link: `localhost:4000/${slug}`
    };

    await this.linkRepository.save(newLink);
    return new LinkSuccessResponse(newLink.link);
  }

  private async generateId(): Promise<string> {
    const generatedSlug = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      6,
    )();
    const link = await this.linkRepository.findOne({
      where: { slug: generatedSlug },
    });
    if (!link) return generatedSlug;
    return this.generateId();
  }
}
