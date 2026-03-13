export type TagName =
  | "games"
  | "music"
  | "sports"
  | "food"
  | "outdoors"
  | "technology"
  | "art"
  | "education"
  | "networking"
  | "anime"

export type TagType = {
    id: string;
    name: TagName;
}