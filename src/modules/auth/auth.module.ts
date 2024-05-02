import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoginUseCase } from './domain/useCases';
import { AuthController } from './presentation/controllers';
import { UsersModule } from '../users';

@Module({
    imports: [ HttpModule, UsersModule ],
    controllers: [ AuthController ],
    providers: [ LoginUseCase ]
})
export class AuthModule { }
