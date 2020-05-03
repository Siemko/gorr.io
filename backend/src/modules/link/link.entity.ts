import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user.entity";

export const USER_EMAIL_MAX_LENGTH = 100;

@ObjectType(Link.name)
@Entity(Link.name.toLowerCase())
export class Link {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  readonly id: number;

  @Field()
  @Column({ unique: true })
  slug: string;

  @Field()
  @Column()
  target: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  link?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.links)
  @JoinColumn()
  user?: User;

  @Column({ default: false, type: "boolean" })
  isDeleted: boolean;
}
