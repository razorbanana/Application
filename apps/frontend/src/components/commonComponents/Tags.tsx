import type { TagType } from "../../types/TagType"
import TagChip from "./TagChip"

type EventCardTagsProps = {
    tags: TagType[] | undefined,
    mode?: 'icons' | 'full' | 'calendar'
}

export default function Tags({tags, mode='full'}:EventCardTagsProps){

    return (
        <div className={`py-1 inline-flex gap-1  ${mode === 'calendar' && "absolute right-0 top-0 mr-2 mt-1"}`}>
            {tags && tags.map(t => <TagChip key={t.id} tag={t.name} mode={mode}/>)}
        </div>
    )
}