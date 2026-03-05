import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Participant } from "./participant.entity";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string

    @Column()
    location: string

    @CreateDateColumn({name: 'event_date'})
    eventDate: Date

    @Column('int', {nullable: true, default: null})
    capacity: number

    @Column({ type: 'boolean', default: true })
    isPublic: boolean;

    @OneToMany(() => Participant, (participant) => participant.event)
    participants: Participant[]
}

export interface EventWithVisitorCount extends Event {
  visitorCount: number;
}