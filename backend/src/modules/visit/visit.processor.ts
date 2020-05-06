import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { Job } from "bull";
import { AddVisitInput } from "./dto/add-visit.input";
import { VisitService } from "./visit.service";

@Processor("visit")
export class VisitProcessor {
  constructor(
    @Inject(VisitService) private readonly visitService: VisitService,
  ) {}

  @Process()
  async handle(job: Job<AddVisitInput>) {
    try {
      const result = await this.visitService.addVisit(job.data);
      if (result === false) {
        throw new Error(`Visit rejected.`);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  @OnQueueActive()
  handleQueueProgress(job: Job<AddVisitInput>) {
    const attemptMsg =
      job.attemptsMade > 0 ? ` [Attempt: ${job.attemptsMade + 1}]` : "";
    console.log(`Processing${attemptMsg} visit with JobId ${job.id}`);
  }

  @OnQueueFailed()
  handleQueueFailed(job: Job<AddVisitInput>, err: Error) {
    console.log(
      `Failed process of visit with JobId ${job.id} \nError message: ${err.message}`,
    );
  }

  @OnQueueCompleted()
  handleQueueCompleted(job: Job<AddVisitInput>) {
    console.log(`Visit registered JobId ${job.id}`);
  }
}
