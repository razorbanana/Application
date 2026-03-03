import * as yup from "yup"

export const leaveEventSchema = yup.object({
    eventId: yup.string().uuid().required()
})