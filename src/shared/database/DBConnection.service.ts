import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DBUsersConnectionParameters } from '@shared/database';

@Injectable()
export abstract class DBConnectionService {
    private readonly uri: string;
    private readonly connectionTimeout: string;

    constructor(private readonly configService: ConfigService, private readonly connectionName: string) {
        const dbConfig = this.configService.getOrThrow('mongoConnection');

        let databaseName: string;
        if (this.connectionName === DBUsersConnectionParameters.DBConnectionName) {
            databaseName = dbConfig.usersDatabase;
        }

        if (dbConfig.username.length > 0) {
            this.uri = dbConfig.uri
                .replace('<username>', dbConfig.username)
                .replace('<password>', encodeURIComponent(dbConfig.password))
                .replace('<host>', dbConfig.host)
                .replace('<port>', dbConfig.port)
                .replace('<database>', databaseName);

        } else {
            this.uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${databaseName}`
        }

        this.connectionTimeout = dbConfig.connectionTimeout;
    }

    async getConnectionParams() {
        return {
            uri: this.uri,
            dbTimeOut: this.connectionTimeout
        };
    }

    async createMongooseOptions() {
        const dbParams = await this.getConnectionParams();

        const connection = {
            uri: dbParams.uri,
            connectTimeoutMS: Number(dbParams.dbTimeOut)
        };
        return connection;
    }
}
