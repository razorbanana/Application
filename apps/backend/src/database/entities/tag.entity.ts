import { Entity, ManyToMany, PrimaryGeneratedColumn, Column } from "typeorm";
import { Event } from "./event.entity";

@Entity()
export class Tag{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Event, event => event.tags)
    events: Event[]
}