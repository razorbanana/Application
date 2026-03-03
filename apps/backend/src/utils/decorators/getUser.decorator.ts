import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type JwtPayload = {
    sub: string,
    username: string
}

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user
    }
)