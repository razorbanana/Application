import { TAGS_REPOSITORY, DATA_SOURCE } from "src/constants";
import { DataSource } from "typeorm";
import { Tag } from "src/database/entities/tag.entity";

export const tagsProviders = [
    {
        provide: TAGS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
        inject: [DATA_SOURCE]
    }
]