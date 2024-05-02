import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '@modules/users/presentation/dtos';
import { CreateUserSerializer } from '@modules/users/presentation/serializers';
import { PLDService } from '@modules/users/domain/services';
import { PLDResponse } from '@modules/users/domain/interfaces';
import { UserRepository } from '../../database/repositories';
import { User } from '../../database/entities';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateUserUseCase {
    private readonly logger = new Logger(CreateUserUseCase.name);
    private readonly saltRounds: number

    constructor(private readonly pldService: PLDService, 
                private readonly userRepository: UserRepository,
                private readonly configService: ConfigService) { 
        const { saltRounds } = this.configService.getOrThrow('auth');
        this.saltRounds = Number(saltRounds);
    }

    async handle(dto: CreateUserDto): Promise<CreateUserSerializer> {
        const { password, country, ...personalInfo } = dto;

        this.logger.log('Look for data');

        var existingUser = await this.userRepository.findByEmail(personalInfo.email);

        if(existingUser){ 
            throw new HttpException('User already registered', 400);
        }
        
        this.logger.log('Validate user');
        
        const pldValidation: PLDResponse = await this.pldService.checkBlacklistStatus(personalInfo);

        if(pldValidation.is_in_blacklist){
            throw new HttpException('User blocked', 400);
        }

        const hash = bcrypt.hashSync(password, this.saltRounds);

        await this.userRepository.save(new User({...personalInfo, country, password: hash}));

        return { message: 'User registered' }
    }
}
