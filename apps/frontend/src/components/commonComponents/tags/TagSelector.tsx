import type { TagName } from "../../../types/TagType"
import { tagConfig } from "../../../utils/config/tagConfig"
import TagChip from "./TagChip"

type TagSelectorProps = {
    selectedTags: TagName[]
    setSelectedTags: (value: TagName[]) => void
    error?: string
}

export default function TagSelector ({selectedTags, setSelectedTags, error=""}:TagSelectorProps) {

   const toggleTag = (tag: TagName) => {
      const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag]
      setSelectedTags(newTags)
   }

   return (
      <div className="flex flex-wrap gap-2 my-2">
         {Object.keys(tagConfig).map(
            tag => {
               const isSelected = selectedTags.includes(tag as TagName)

               return (
                  <button
                     key={tag}
                     type='button'
                     onClick={() => toggleTag(tag as TagName)}
                     className={`
                     transition
                     opacity-70}
                     `}
                  >
                     <TagChip tag={tag as TagName} mode="full" isSelected={isSelected}/>
                  </button>
               )
            }
         )}
         {error && <p className="text-red-500 text-sm mb-2 ">{error}</p>}
      </div>
   )
}