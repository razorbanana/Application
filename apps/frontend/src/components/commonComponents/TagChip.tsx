import type { TagName } from "../../types/TagType"
import { tagConfig } from "../../utils/config/tagConfig"

type TagChipProps = {
    tag: TagName,
    mode: 'icons' | 'full'
}

export default function TagChip({tag, mode}: TagChipProps){
    const config = tagConfig[tag]
    const Icon = config.icon
    return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs w-fit ${config.color}`}>
            <Icon size={12} />
            {mode == 'full' && tag.toUpperCase()}
        </div>
    )
}