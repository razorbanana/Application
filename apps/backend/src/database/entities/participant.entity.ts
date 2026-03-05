import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinTable, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

export type UserRole = 'visitor' | 'organizer'

@Entity()
export class Participant {
    @PrimaryColumn('uuid')
    userId: string;

    @PrimaryColumn('uuid')
    eventId: string;

    @ManyToOne(()=>User, (user) => user.events, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId"})
    user: User

    @ManyToOne(()=>Event, (event) => event.participants, {onDelete: "CASCADE"})
    @JoinColumn({name: "eventId"})
    event: Event

    @Column()
    userRole: UserRole;

}