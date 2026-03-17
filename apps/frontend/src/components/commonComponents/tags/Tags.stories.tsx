import Tags from "./Tags"

export default {
  title: "Components/Tags",
  component: Tags,
}

export const IconsTags = () => <Tags tags={["music", "games"]} mode="icons"/>

export const FullTags = () => <Tags tags={["music", "games"]}  mode="full"/>

export const CalendarTags = () => <Tags tags={["music", "games"]}  mode="calendar"/>