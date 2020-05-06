import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "argon2";
import { DeepPartial, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BaseResponse } from "../../shared/base-response.interface";
import { EmailService } from "../email/email.service";
import { AddUserInput } from "./dto/add-user.input";
import { User } from "./user.entity";
import {
  ActivationInvalidResponse,
  ActivationSuccessResponse,
  UserEmailTakenResponse,
  UserSuccessResponse,
} from "./user.responses";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(EmailService) private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async findByEmail(userEmail: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: userEmail,
      },
    });
  }

  async addUser(dto: AddUserInput): Promise<BaseResponse> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existingUser != null) {
      return new UserEmailTakenResponse();
    }

    const newUser: DeepPartial<User> = {
      activationToken: uuidv4(),
      email: dto.email,
      isActive: false,
      password: await hash(dto.password),
      createdAt: new Date(),
    };

    await this.userRepository.save(newUser);
    try {
      await this.emailService.sendActivationEmail(
        newUser.activationToken,
        newUser.email,
      );
    } catch {
      console.error(`Error sending activation mail for user ${newUser.email}`);
    }

    return new UserSuccessResponse();
  }

  async activateUser(
    token: string,
  ): Promise<ActivationInvalidResponse | ActivationSuccessResponse> {
    const user = await this.userRepository.findOne({
      where: {
        activationToken: token,
      },
    });

    if (!user) return new ActivationInvalidResponse();

    user.activationToken = null;
    user.isActive = true;

    await this.userRepository.save(user);
    return new ActivationSuccessResponse();
  }
}
