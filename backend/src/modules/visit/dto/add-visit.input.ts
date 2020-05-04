import { Link } from "../../link/link.entity";

export class AddVisitInput {
  userAgentHeader?: string;
  realIp?: string;
  referer?: string;
  link: Link;
}
