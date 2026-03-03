import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinTable } from "typeorm";
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
    @JoinTable({name: "userId"})
    user: User

    @ManyToOne(()=>Event, (event) => event.participants, {onDelete: "CASCADE"})
    @JoinTable({name: "eventId"})
    event: Event

    @Column()
    userRole: UserRole;

}