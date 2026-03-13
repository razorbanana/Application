import type { TagName } from "../../types/TagType"
import { tagConfig } from "../../utils/config/tagConfig"

type TagChipProps = {
    tag: TagName
}

export default function TagChip({tag}: TagChipProps){
    const config = tagConfig[tag]
    const Icon = config.icon
    return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs w-fit ${config.color}`}>
            <Icon size={12} />
            {tag.toUpperCase()}
        </div>
    )
}