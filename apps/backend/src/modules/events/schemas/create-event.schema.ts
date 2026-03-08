import * as yup from "yup"

export const createEventSchema = yup.object({
    name: yup.string().min(2).max(64).required(),
    description: yup.string().min(16).max(512).required(),
    location: yup.string().min(2).max(64).required(),
    eventDate: yup.date().min(new Date()).required(),
    capacity: yup.number().optional(),
    isPublic: yup.boolean().optional()
})