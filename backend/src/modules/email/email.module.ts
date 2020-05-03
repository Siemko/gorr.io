import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { EmailProcessor } from "./email.processor";
import { MailSender } from "./email.sender";
import { EmailService } from "./email.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "email",
      redis: {
        host: "redis",
      },
    }),
  ],
  controllers: [],
  providers: [
    EmailService,
    EmailProcessor,
    { provide: MailSender, useValue: new MailSender() },
  ],
  exports: [EmailService],
})
export class EmailModule {}
