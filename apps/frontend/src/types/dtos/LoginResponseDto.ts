import type { UserType } from "../UserType"

export type LoginResponseDto = {
    access_token: string,
    user: UserType
}
