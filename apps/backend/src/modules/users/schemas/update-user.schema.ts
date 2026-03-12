import * as yup from "yup"

export const updateUserSchema = yup.object({
  fullName: yup.string().min(2).max(32).notRequired(),
  username: yup.string().min(4).max(16).notRequired(),
  email: yup.string().email().max(254).notRequired(),
  password: yup.string().min(8).max(32).notRequired(),
  city: yup.string().min(2).max(64).notRequired(),
});