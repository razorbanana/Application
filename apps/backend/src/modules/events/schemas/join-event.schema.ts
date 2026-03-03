import * as yup from "yup"

export const joinEventSchema = yup.object({
    eventId: yup.string().uuid().required(),
    userRole: yup.string().oneOf(["organizer", "visitor"]).required()
})