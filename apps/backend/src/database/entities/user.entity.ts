import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Participant } from "./participant.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    fullName: string

    @Column({nullable: true, default: null})
    city: string

    @OneToMany(() => Participant, (participant) => participant.user)
    events: Participant[]
}