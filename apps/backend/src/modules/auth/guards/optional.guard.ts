import { CanActivate, ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export class OptionalAuthGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => JwtService))
        private readonly jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token){
            request['user'] = null
            return true
        }
        try {
            const payload = await this.jwtService.verifyAsync(token)
            request['user'] = payload
        } catch (err) {
            request['user'] = null
        }
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}