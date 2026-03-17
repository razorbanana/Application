import {
  Gamepad2,
  Music,
  Dumbbell,
  Utensils,
  Trees,
  Cpu,
  Palette,
  GraduationCap,
  Users,
  Sparkles
} from "lucide-react";
import type { TagName } from "../../types/TagType";
import { type LucideProps } from "lucide-react";

type TagIconAndStyle = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  color: string
}

export const tagConfig: Record<TagName, TagIconAndStyle> = {
  games: {
    icon: Gamepad2,
    color: "bg-purple-100 text-purple-700"
  },
  music: {
    icon: Music,
    color: "bg-pink-100 text-pink-700"
  },
  sports: {
    icon: Dumbbell,
    color: "bg-red-100 text-red-700"
  },
  food: {
    icon: Utensils,
    color: "bg-orange-100 text-orange-700"
  },
  outdoors: {
    icon: Trees,
    color: "bg-green-100 text-green-700"
  },
  technology: {
    icon: Cpu,
    color: "bg-sky-100 text-sky-700"
  },
  art: {
    icon: Palette,
    color: "bg-fuchsia-100 text-fuchsia-700"
  },
  education: {
    icon: GraduationCap,
    color: "bg-indigo-100 text-indigo-700"
  },
  networking: {
    icon: Users,
    color: "bg-blue-100 text-blue-700"
  },
  anime: {
    icon: Sparkles,
    color: "bg-yellow-100 text-yellow-700"
  }
};