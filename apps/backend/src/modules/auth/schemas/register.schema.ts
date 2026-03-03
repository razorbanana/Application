import * as yup from "yup"

export const registerScheme = yup.object({
    //minimum is 2 in case someone decides to include only their name which may be Li
    fullName: yup.string().min(2).max(32).required(),
    username: yup.string().min(4).max(16).required(),
    email: yup.string().email().max(254).required(),
    password: yup.string().min(8).max(32).required(),
    //there are cities like Xi and Chargoggagoggmanchauggagoggchaubunagungamaugg
    city: yup.string().min(2).max(64).optional()
})