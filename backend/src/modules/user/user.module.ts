import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
