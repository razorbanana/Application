import type { TagType } from "../../types/TagType"
import TagChip from "./TagChip";

type EventCardTagsProps = {
    tags: TagType[] | undefined
}

export default function EventCardTags({tags}:EventCardTagsProps){

    return (
        <div className="pt-1">
            {tags && tags.map(t => <TagChip key={t.id} tag={t.name}/>)}
        </div>
    )
}