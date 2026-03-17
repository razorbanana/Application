import { CreateEventDto } from "src/modules/events/dto/create-event.dto";
import { databaseProviders } from "../database.providers";
import { Participant } from "../entities/participant.entity";
import { User } from "../entities/user.entity";
import { RegisterDto } from "src/modules/auth/dto/register.dto";
import { Event } from "../entities/event.entity";
import { JoinEventDto } from "src/modules/events/dto/join-event.dto";
import { Tag } from "../entities/tag.entity";

async function seed(){
    const dataSource = await databaseProviders[0].useFactory()
    const userRepo = dataSource.getRepository(User)
    const eventRepo = dataSource.getRepository(Event)
    const participantRepo = dataSource.getRepository(Participant)
    const tagRepo = dataSource.getRepository(Tag)

    const usersData : RegisterDto[] = [
        {
            fullName: "Alice Morgan",
            email: "alice.morgan@example.com",
            password: "Passw0rd!",
            username: "alice_m",
            city: "San Francisco"
        },
        {
            fullName: "Benjamin Lee",
            email: "ben.lee@example.com",
            password: "Secure123!",
            username: "benlee",
            city: "New York"
        },
        {
            fullName: "Clara Johansson",
            email: "clara.j@example.com",
            password: "Clara2026",
            username: "clara_j",
            city: "Stockholm"
        }
    ]

    const userEntities: User[] = []
    for (const user of usersData) {
        const result = userRepo.create(user);
        userEntities.push(result)
    }
     
    const users: User[] = []
    for (const user of userEntities) {
        const result = await userRepo.save(user);
        users.push(result)
    }

    const tagNames = [
        { "name": "games" },
        { "name": "music" },
        { "name": "sports" },
        { "name": "food" },
        { "name": "outdoors" },
        { "name": "technology" },
        { "name": "art" },
        { "name": "education" },
        { "name": "networking" },
        { "name": "anime" }
    ]

    for (const tag of tagNames) {
        const t = await tagRepo.save(tagRepo.create(tag))
    }

    const eventsData = [
        {
            name: "Tech Meetup SF",
            description: "A casual meetup for software developers to share ideas.",
            location: "San Francisco",
            eventDate: new Date("2026-03-15T18:00:00Z"),
            capacity: 100
        },
        {
            name: "NYC Startup Pitch Night",
            description: "Entrepreneurs pitch their startup ideas to local investors.",
            location: "New York",
            eventDate: new Date("2026-04-10T19:30:00Z"),
            capacity: 80
        },
        {
            name: "Stockholm Design Workshop",
            description: "Hands-on workshop for graphic and UI/UX designers.",
            location: "Stockholm",
            eventDate: new Date("2026-03-25T15:00:00Z"),
            capacity: 40
        }
    ]

    const events = await eventRepo.save(eventRepo.create(eventsData));

    const participantsData: JoinEventDto[] = [
        {
            userId: users[0].id,
            eventId: events[0].id,
            userRole: "organizer"
        },
        {
            userId: users[0].id,
            eventId: events[1].id,
            userRole: "organizer"
        },
        {
            userId: users[0].id,
            eventId: events[2].id,
            userRole: "visitor"
        },
        {
            userId: users[1].id,
            eventId: events[2].id,
            userRole: "organizer"
        },
        {
            userId: users[1].id,
            eventId: events[0].id,
            userRole: "visitor"
        }
    ]

    await participantRepo.save(participantRepo.create(participantsData))

    console.log("🌱 Seed completed: users, events, participants");
    await dataSource.destroy();
}

try{
    seed()
}catch(err){
    console.log(err)
}