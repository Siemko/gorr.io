import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Link } from "../link/link.entity";

export const USER_EMAIL_MAX_LENGTH = 100;

@ObjectType(Visit.name)
@Entity(Visit.name.toLowerCase())
export class Visit {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  readonly id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ip?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userAgent?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  referer?: string;

  @Field()
  @Column()
  createdAt: Date;


  @Field(() => Link, { nullable: true })
  @ManyToOne(() => Link, link => link.visits)
  @JoinColumn()
  link?: Link;
}