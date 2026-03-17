import * as yup from "yup"

export const createTagSchema = yup.object({
    name: yup.string().required()
})