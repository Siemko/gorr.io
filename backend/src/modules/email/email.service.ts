import { InjectQueue } from "@nestjs/bull";
import { Dependencies, Injectable } from "@nestjs/common";
import { Queue } from "bull";
import * as Mail from "nodemailer/lib/mailer";

@Injectable()
@Dependencies()
export class EmailService {
  constructor(@InjectQueue("email") private emailQueue: Queue) {}

  async sendActivationEmail(
    activationToken: string,
    userEmail: string,
  ): Promise<boolean> {
    return this.send({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Gorrion link cutter account activation`,
      html: `Hello! <br /> Click <a href="${process.env.CLIENT_URL}/activate-account?token=${activationToken}">here</a> to confirm your account.`,
    });
  }

  private async send(email: Mail.Options) {
    const job = await this.emailQueue.add(email, {
      attempts: 12,
      backoff: {
        type: "exponential",
        delay: 500,
      },
    });

    return job.processedOn > 0;
  }
}
