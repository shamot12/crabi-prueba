import { HttpException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from '@modules/auth/presentation/dtos';
import { LoginSerializer } from '@modules/auth/presentation/serializers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginStatesEnum } from '../enum/login-states.enum';
import { UserRepository } from '@src/modules/users/database/repositories';

@Injectable()
export class LoginUseCase {
    private readonly logger = new Logger(LoginUseCase.name);
    private readonly jwtKey: string;

    constructor(private readonly userRepository: UserRepository,
        private readonly configService: ConfigService) {
            const { jwtKey } = this.configService.getOrThrow('auth');
            this.jwtKey = jwtKey;
        }

    async handle(dto: LoginDto): Promise<LoginSerializer> {
        const { email, password } = dto;

        // Look if user is registered
        var existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser) {
            return new LoginSerializer(LoginStatesEnum.WRONG_CREDENTIALS)
        }

        try {
            // Validate password
            const passwordValidation = bcrypt.compareSync(password, existingUser.password);
    
            if (!passwordValidation) {
                return new LoginSerializer(LoginStatesEnum.WRONG_CREDENTIALS);
            }
    
            // Login successful
            const { email, _id } = existingUser;
            var token = jwt.sign({ email, id: _id }, this.jwtKey, { expiresIn: '1h' }); // Token exipres in 1h
            
            return new LoginSerializer(LoginStatesEnum.LOGIN_SUCCESSFUL, token);
        } catch (e) {
            // TODO: improve exception handling
            this.logger.log(`Error. ${e.toString()}`)
            throw new HttpException('Internal server error', 500);
        }
    }
}
