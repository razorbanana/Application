import { Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { EventsService } from '../events/events.service';
import { type JwtPayload } from 'src/utils/decorators/getUser.decorator';
import Groq from 'groq-sdk';
import dotenv from "dotenv"
dotenv.config()

@Injectable()
export class ChatbotService {

  constructor(
    private readonly eventsService: EventsService
  ){}

  private groq = new Groq({apiKey: process.env.GROQ_API_KEY})

  async getChatResponse (user: JwtPayload | null, chatDto: ChatDto){
    const myEvents = user ? await this.eventsService.findMyWithParticipants(user.sub) : null
    const allEvents = await this.eventsService.findAllPublicWithParticipants()
    const systemPrompt = `
      You are a helpful event assistant. You answer the questions about the events information and their visitors. Here is the data:
      ${myEvents ? "- User's Events:" + JSON.stringify(myEvents) : "User is unauthorized, provide him with public information"}
      - All Events: ${JSON.stringify(allEvents)}
      Do not include participants and publicity if not requested by user.
      Make sure to answer using only the provided data.
      The request was sent on ${new Date().toISOString()}
      If a question is unclear or not related to this data, 
      respond exactly with: "Sorry, I didn’t understand that. Please try rephrasing your question."

      The user's query is ${chatDto.message}
    `

    const response = await this.groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: systemPrompt
        }
      ],
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b"
    })

    return response.choices[0].message
  }
}