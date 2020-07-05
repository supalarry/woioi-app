import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
/* This defines that this is type available in our graphql schema aka typedef */
@Entity('users')
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('text', { default: 0 })
    email: string;

    @Column('text')
    password: string;

    /* Each time we give a refresh token, we increment version. This is alternative
    to having blacklist or whitelist of tokens */
    @Column('int', { default: 0 })
    tokenVersion: number;

    @Field()
    @Column('text', { default: 0 })
    username: string;

    @Field()
    @Column('text', { default: 0 })
    mainLang: string;
}
