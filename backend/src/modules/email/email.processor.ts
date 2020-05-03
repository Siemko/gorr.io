import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import * as Mail from "nodemailer/lib/mailer";
import { MailSender } from "./email.sender";

@Processor("email")
export class EmailProcessor {
  constructor(@Inject(MailSender) private readonly emailSender: MailSender) {}

  @Process()
  async handle(job: Job<Mail.Options>) {
    const result = await this.emailSender.send(job.data);

    if (result.rejected.length > 0) {
      throw new Error(`Email messsage rejected. Response: ${result.response}`);
    }
  }

  @OnQueueActive()
  handleQueueProgress(job: Job<Mail.Options>) {
    const attemptMsg =
      job.attemptsMade > 0 ? ` [Attempt: ${job.attemptsMade + 1}]` : "";
    console.log(
      `Processing sending email${attemptMsg} to ${job.data.to} and JobId ${job.id}`,
    );
  }

  @OnQueueFailed()
  handleQueueFailed(job: Job<Mail.Options>, err: Error) {
    console.log(
      `Failed sending email to ${job.data.to} and JobId ${job.id} \nError message: ${err.message}`,
    );
  }

  @OnQueueCompleted()
  handleQueueCompleted(job: Job<Mail.Options>) {
    console.log(
      `Completed sending email to ${job.data.to} and JobId ${job.id}`,
    );
  }
}
