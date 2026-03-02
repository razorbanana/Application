import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

export type UserRole = 'visitor' | 'organizer'

@Entity()
export class Participant {
    @PrimaryColumn('uuid', {name: "user_id"})
    userId: string;

    @PrimaryColumn('uuid', {name: "event_id"})
    eventId: string;

    @ManyToOne(()=>User, (user) => user.events, {onDelete: "CASCADE"})
    @JoinTable({name: "user_id"})
    user: User

    @ManyToOne(()=>Event, (event) => event.participants, {onDelete: "CASCADE"})
    @JoinTable({name: "event_id"})
    event: Event

    @Column()
    userRole: UserRole;

}