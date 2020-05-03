import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { EmailModule } from "./modules/email/email.module";
import { LinkModule } from "./modules/link/link.module";
import { UserModule } from "./modules/user/user.module";
import * as ormConfig from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join("src", "graphql", "schema.gql"),
      debug: process.env.NODE_ENV !== "production",
      introspection: process.env.NODE_ENV !== "production",
      typePaths: ["./src/**/*.graphql"],
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    UserModule,
    LinkModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
