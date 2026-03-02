import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Participant } from "./participant.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    fullName: string

    @Column()
    city: string

    @OneToMany(() => Participant, (participant) => participant.user)
    events: Participant[]
}