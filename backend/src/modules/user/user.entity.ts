import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Link } from "../link/link.entity";

export const USER_EMAIL_MAX_LENGTH = 100;

@ObjectType(User.name)
@Entity(User.name.toLowerCase())
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: "int" })
  readonly id: number;

  @Field(() => Boolean)
  @Column({ default: false, type: "boolean" })
  isActive: boolean;

  @Field()
  @Column({ length: USER_EMAIL_MAX_LENGTH, unique: true })
  email: string;

  @Field(() => [Link])
  @OneToMany(() => Link, link => link.user, { eager: true })
  links: Link[];

  @Field()
  @Column()
  createdAt: Date;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  passwordResetToken?: string;

  @Column({ nullable: true })
  passwordResetTokenExpiryDate?: Date;

  @Column({ nullable: true, unique: true })
  activationToken?: string;
}
