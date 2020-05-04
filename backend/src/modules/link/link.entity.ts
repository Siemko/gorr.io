import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { User } from "../user/user.entity";
import { Visit } from "../visit/visit.entity";

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

  @Field()
  @Column()
  createdAt: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.links)
  @JoinColumn()
  user?: User;

  @Field(() => [Visit], {nullable: true})
  @OneToMany(() => Visit, visit => visit.link, { eager: true })
  visits: Visit[];

  @Column({ default: false, type: "boolean" })
  isDeleted: boolean;
}
