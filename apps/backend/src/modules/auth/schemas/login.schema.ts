import * as yup from "yup"

export const loginSchema = yup.object({
    //username's minimal length is 4, email's max length is 254
    credentials: yup.string().min(4).max(254).required(),
    //password's length is minimum 8 characters
    password: yup.string().min(8).required()
})