import { HttpException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
    export interface UserTokenJWTPayload extends jwt.JwtPayload {
        email: string;
        id: string;
        iat: number;
        exp: number;
    }
}

@Injectable()
export class JWTVerification implements NestMiddleware {
    private readonly logger: Logger = new Logger(JWTVerification.name);
    private readonly jwtKey: string;

    constructor(private readonly configService: ConfigService) {
        const { jwtKey } = this.configService.getOrThrow('auth');
        this.jwtKey = jwtKey;
    }

    use(request: Request, response: Response, next: NextFunction) {
        try {
            this.logger.log('Validating JWT')
            let decoded = <jwt.UserTokenJWTPayload> jwt.verify(request.headers['token'], this.jwtKey);

            // Validate token expiration - may not be required always true.
            if(decoded.exp < (new Date().getTime() / 1000)){
                throw new HttpException('Session expired. Please sign in again.', 401);
            }

            next();
        } catch (err) {
            this.logger.log('Unauthorized request')
            throw new HttpException('Unauthorized request. Verify your token or sign in again.', 401);
        }
    }
}
