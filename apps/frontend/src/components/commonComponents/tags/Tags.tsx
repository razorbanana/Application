import type { TagName } from "../../../types/TagType"
import TagChip from "./TagChip"

type EventCardTagsProps = {
    tags: TagName[] | undefined,
    mode?: 'icons' | 'full' | 'calendar'
}

export default function Tags({tags, mode='full'}:EventCardTagsProps){
    return (
        <div className={`py-1 ${mode === 'calendar' ? "hidden xl:inline-flex 2xl:absolute 2xl:right-0 2xl:top-0 mr-2 mt-1" : "flex flex-wrap gap-1"}`}>
            {tags && tags.map(t => <TagChip key={t} tag={t} mode={mode}/>)}
        </div>
    )
}