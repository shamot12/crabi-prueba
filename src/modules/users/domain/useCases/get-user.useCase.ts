import { HttpException, Injectable, Logger } from '@nestjs/common';
import { GetUserDto } from '@modules/users/presentation/dtos';
import { GetUserSerializer } from '@modules/users/presentation/serializers';
import { UserRepository } from '../../database/repositories';
import { User } from '../../database/entities';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GetUserUseCase {
    private readonly logger = new Logger(GetUserUseCase.name);

    private readonly jwtKey: string;

    constructor(private readonly userRepository: UserRepository,
                private readonly configService: ConfigService) { 
        const { jwtKey } = this.configService.getOrThrow('auth');
        this.jwtKey = jwtKey;
    }

    async handle(dto: GetUserDto, token: string): Promise<GetUserSerializer> {
        var decoded = <jwt.UserTokenJwtPayload> jwt.verify(token, this.jwtKey);

        const user = await this.userRepository.findById(decoded.id);

        if(!user){
            throw new HttpException('Invalid token', 401);
        }

        const { first_name, last_name, email, country } = user;

        return { first_name, last_name, email, country } ;
    }
}
