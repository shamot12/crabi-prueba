import { UsersModule } from '@modules/users';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '@src/config/configuration';
import { UsersDBConnectionService } from '@modules/users/database/services';
import { DBUsersConnectionParameters } from './shared/database';
import { AuthModule } from './modules/auth';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            cache: true
        }),
        MongooseModule.forRootAsync({
            useClass: UsersDBConnectionService,
            connectionName: DBUsersConnectionParameters.DBConnectionName
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [ ],
    providers: [ ]
})
export class AppModule { }
