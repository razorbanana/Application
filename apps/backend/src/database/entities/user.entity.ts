import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeUpdate, BeforeInsert } from "typeorm";
import { Participant } from "./participant.entity";
import { Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { BotMessage } from "./bot-message.entity";
dotenv.config()

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string

    @Exclude()
    @Column()
    password!: string
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if (this.password){
            const saltRounds = parseInt(process.env.SALT_ROUNDS || '12', 10);
            this.password = await bcrypt.hash(this.password, saltRounds)
        }
    }

    @Column()
    fullName: string

    @Column({nullable: true, default: null})
    city: string

    @OneToMany(() => Participant, (participant) => participant.user)
    events: Participant[]

    @OneToMany(() => BotMessage, (message) => message.user)
    botMessages: BotMessage[]
}