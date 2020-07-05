import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
/* This defines that this is type available in our graphql schema aka typedef */
@Entity('songs')
export class Song extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('int', { default: 0 })
    ownerId: number;

    @Field()
    @Column('text', { default: 0 })
    name: string;

    @Field()
    @Column('text', { default: 0 })
    nameTranslation: string;

    @Field()
    @Column('text', { default: 0 })
    artist: string;

    @Field()
    @Column('text', { default: 0 })
    lyricsDeconstructed: string;

    @Field()
    @Column('text', { default: 0 })
    to: string;

    @Field()
    @Column('text', { default: 0 })
    language: string;

    @Field()
    @Column('text', { default: 0 })
    albumCoverUrl: string;
}
