import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Participant } from "./participant.entity";
import { Tag } from "./tag.entity";

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

    @CreateDateColumn()
    eventDate: Date

    @Column('int', {nullable: true, default: null})
    capacity: number

    @Column({ type: 'boolean', default: true })
    isPublic: boolean;

    @OneToMany(() => Participant, (participant) => participant.event)
    participants: Participant[]

    @ManyToMany(() => Tag, (tag) => tag.events)
    @JoinTable({
        name: "event_tags",
    })
    tags: Tag[]
}
