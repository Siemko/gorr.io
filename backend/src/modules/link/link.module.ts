import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Link } from "./link.entity";
import { LinkResolver } from "./link.resolver";
import { LinkService } from "./link.service";

@Module({
  imports: [TypeOrmModule.forFeature([Link]), UserModule],
  providers: [LinkService, LinkResolver],
  exports: [LinkService]
})
export class LinkModule {}
