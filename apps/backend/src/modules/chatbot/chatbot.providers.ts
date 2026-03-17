import { DataSource } from "typeorm";
import { DATA_SOURCE, BOTMESSAGE_REPOSITORY } from "src/constants";
import { BotMessage } from "src/database/entities/bot-message.entity";

export const chatbotProviders = [
    {
        provide: BOTMESSAGE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BotMessage),
        inject: [DATA_SOURCE]
    }
]