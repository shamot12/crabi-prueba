import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { DBUsersConnectionParameters, DBConnectionService } from '@shared/database';

@Injectable()
export class UsersDBConnectionService extends DBConnectionService {
    
    constructor( configService: ConfigService ){
        super(configService, DBUsersConnectionParameters.DBConnectionName)
    }
}