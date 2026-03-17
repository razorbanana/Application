import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class BotMessage {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, (user) => user.botMessages, { onDelete: "CASCADE" })
  user: User

  @Column({
    type: "enum",
    enum: ["user", "assistant", "system"]
  })
  role: "user" | "assistant" | "system"

  @Column("text")
  content: string

  @CreateDateColumn()
  createdAt: Date
}