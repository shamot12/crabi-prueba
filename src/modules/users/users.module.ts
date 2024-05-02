import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CreateUserUseCase, GetUserUseCase } from './domain/useCases';
import { UsersController } from './presentation/controllers';
import { PLDService } from './domain/services';
import { UserRepository } from './database/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './database/entities';
import { UserSchema } from './database/schemas';
import { DBUsersConnectionParameters } from '@src/shared/database';
import { JWTVerification } from './presentation/middlewares';

@Module({
    imports: [ HttpModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ], DBUsersConnectionParameters.DBConnectionName)
    ],
    controllers: [ UsersController ],
    providers: [ CreateUserUseCase, GetUserUseCase, PLDService, UserRepository ],
    exports: [ UserRepository ]
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JWTVerification)
            .forRoutes({ path: 'users', method: RequestMethod.GET });
    }
}
