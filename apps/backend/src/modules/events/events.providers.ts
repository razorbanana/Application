import { Event } from "src/database/entities/event.entity";
import { Participant } from "src/database/entities/participant.entity";
import { DataSource } from "typeorm";

export const eventsProviders = [
    {
        provide: "EVENTS_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
        inject: ["DATA_SOURCE"]
    },
    {
        provide: "PARTICIPANTS_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Participant),
        inject: ["DATA_SOURCE"]
    }
]