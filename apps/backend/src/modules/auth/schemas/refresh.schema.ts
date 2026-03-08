import * as yup from "yup"

export const refreshSchema = yup.object({
    refresh_token: yup.string().required()
})