import * as yup from "yup"

export const updateEventSchema = yup.object({
    name: yup.string().min(2).max(64).optional(),
    description: yup.string().min(16).max(512).optional(),
    location: yup.string().min(2).max(64).optional(),
    eventDate: yup.date().min(new Date()).optional(),
    capacity: yup.number().optional(),
    isPublic: yup.boolean().optional(),
    tagIds: yup.array().of(yup.string().uuid()).optional()
})