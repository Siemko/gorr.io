import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import * as useragent from "useragent";
import { getRealIp } from "../../shared/real-ip.util";
import { AddVisitInput } from "./dto/add-visit.input";
import { Visit } from "./visit.entity";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    @InjectQueue("visit") private visitQueue: Queue,
  ) {}

  queueVisit(dto: AddVisitInput) {
    this.visitQueue.add(dto, {
      attempts: 5,
      backoff: {
        type: "fixed",
        delay: 500,
      },
    });
  }

  async addVisit(dto: AddVisitInput) {
    try {
      const userAgent = dto.userAgentHeader
        ? useragent.lookup(dto.userAgentHeader).toString()
        : null;
      const newVisit: DeepPartial<Visit> = {
        createdAt: new Date(),
        userAgent: userAgent,
        ip: dto.realIp,
        referer: dto.referer,
        link: dto.link,
      };

      await this.visitRepository.save(newVisit);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
