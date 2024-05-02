import { validateEnv } from '@src/config/validate-env';
import dotenv from 'dotenv';
import { IConfig } from './config.interface';

dotenv.config();

validateEnv(process.env);

export default (): IConfig => ({
    environment: process.env.NODE_ENV,
    server: {
        url: process.env.MICROSERVICE_URL,
        prefix: process.env.MICROSERVICE_PREFIX,
        port: process.env.MICROSERVICE_PORT
    },
    mongoConnection: {
        uri: process.env.DOCUMENT_DB_URI,
        host: process.env.DOCUMENT_DB_HOST,
        port: process.env.DOCUMENT_DB_PORT,
        username: process.env.DOCUMENT_DB_USERNAME,
        password: process.env.DOCUMENT_DB_PASSWORD,
        connectionTimeout: process.env.DOCUMENT_DB_CONNECTION_TIMEOUT,
        usersDatabase: process.env.DOCUMENT_DB_USERS_DATABASE
    },
    pldService: {
        url: process.env.PLD_SERVICE_URL
    },
    auth: {
        saltRounds: process.env.HASH_SALT_ROUNDS,
        jwtKey: process.env.JWT_KEY
    }
});