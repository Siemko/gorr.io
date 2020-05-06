import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Visit } from "./visit.entity";
import { VisitProcessor } from "./visit.processor";
import { VisitService } from "./visit.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),
    BullModule.registerQueue({
      name: "visit",
      redis: {
        host: "redis",
      },
    }),
  ],
  providers: [VisitService, VisitProcessor],
  exports: [VisitService],
})
export class VisitModule {}
