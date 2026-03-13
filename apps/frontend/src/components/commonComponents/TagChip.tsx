import type { TagName } from "../../types/TagType"
import { tagConfig } from "../../utils/config/tagConfig"

type TagChipProps = {
    tag: TagName,
    mode: 'icons' | 'full' | 'calendar',
    isSelected?: boolean
}

export default function TagChip({tag, mode, isSelected=false}: TagChipProps){
    const config = tagConfig[tag]
    const Icon = config.icon
    return (
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs w-fit cursor-pointer ${config.color} ${isSelected && "ring-2 ring-blue-500"}`}>
            <Icon size={12} />
            {mode == 'full' && tag.toUpperCase()}
        </div>
    )
}