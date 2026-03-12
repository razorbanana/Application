import { User } from "src/database/entities/user.entity";
import { DataSource } from "typeorm";
import { USERS_REPOSITORY, DATA_SOURCE } from "src/constants";

export const usersProviders = [
    {
        provide: USERS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: [DATA_SOURCE]
    }
]