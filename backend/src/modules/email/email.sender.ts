import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";

@Injectable()
export class MailSender {
  private readonly transporter: Mail;
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  send(message: Mail.Options) {
    return this.transporter.sendMail(message);
  }
}
