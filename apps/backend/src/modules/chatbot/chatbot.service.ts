import { Inject, Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { EventsService } from '../events/events.service';
import { type JwtPayload } from 'src/utils/decorators/getUser.decorator';
import Groq from 'groq-sdk';
import dotenv from "dotenv"
import { BOTMESSAGE_REPOSITORY } from 'src/constants';
import { Repository } from 'typeorm';
import { BotMessage } from 'src/database/entities/bot-message.entity';
dotenv.config()

@Injectable()
export class ChatbotService {

  constructor(
    private readonly eventsService: EventsService,

    @Inject(BOTMESSAGE_REPOSITORY)
    private botmessageRepository: Repository<BotMessage>
  ){}

  private groq = new Groq({apiKey: process.env.GROQ_API_KEY})

  async getChatResponse (user: JwtPayload | null, chatDto: ChatDto){
    const myEvents = user ? await this.eventsService.findMyWithParticipants(user.sub) : null
    const allEvents = await this.eventsService.findAllPublicWithParticipants()
    const prevMessages = user ? await this.botmessageRepository.find({
      where: {
        user: {
          id: user.sub
        }
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true
      },
      order: {
        createdAt: "DESC"
      },
      take: 10
    })
    : []

    const history = prevMessages
      .reverse()
      .map(({ role, content }) => ({ role, content }))

    const systemPrompt = `
      You are a helpful event assistant. You answer the questions about the events information and their visitors. Here is the data:
      ${myEvents ? "- User's Events:" + JSON.stringify(myEvents) : "User is unauthorized, provide him with public information"}
      - All Events: ${JSON.stringify(allEvents)}
      Do not include participants and publicity if not requested by user.
      Make sure to answer using only the provided data.
      The request was sent on ${new Date().toISOString()}
      Provide your questions as full sentences, do not return event information in a table format.

      If a question is unclear or not related to this data, 
      respond exactly with: "Sorry, I didn’t understand that. Please try rephrasing your question."
    `

    const response = await this.groq.chat.completions.create({
      messages: [
        ...history,
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: chatDto.message
        },
      ],
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b"
    })

    const botResponse = response.choices[0].message.content

    if (user && botResponse){
      await this.botmessageRepository.save(this.botmessageRepository.create({
        user: {
          id: user.sub
        },
        role: "user",
        content: chatDto.message
      }))

      await this.botmessageRepository.save(this.botmessageRepository.create({
        user: {
          id: user.sub
        },
        role: "assistant",
        content: botResponse
      }))
    }

    return botResponse
  }

  async getChatHistory (user: JwtPayload){
    const prevMessages = await this.botmessageRepository.find({
      where: {
        user: {
          id: user.sub
        }
      },
      select: {
        id: true,
        role: true,
        content: true,
        createdAt: true
      },
      order: {
        createdAt: "DESC"
      }
    })
    return prevMessages.reverse().map(({role, content}) => ({role, content}))
  }
}