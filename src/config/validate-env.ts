import { cleanEnv, num, port, str, url } from 'envalid';

export const validateEnv = (config: Record<string, any>): Record<string, any> =>
{
    const clean = cleanEnv(config, {
        NODE_ENV: str({
            choices: ['development', 'test', 'production', 'staging'],
            default: 'development'
        }),

        MICROSERVICE_URL: url({ default: 'http://localhost:4008' }),
        MICROSERVICE_PORT: port({ default: 4008 }),
        MICROSERVICE_PREFIX: str({ default: '/' }),

        DOCUMENT_DB_URI: str({ default: 'mongodb://<username>:<password>@<host>:<port>/<database>?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false' }),
        DOCUMENT_DB_HOST: str(),
        DOCUMENT_DB_PORT: str(),
        DOCUMENT_DB_USERNAME: str(),
        DOCUMENT_DB_PASSWORD: str(),
        DOCUMENT_DB_CONNECTION_TIMEOUT: num({ default: 9000 }),
        DOCUMENT_DB_USERS_DATABASE: str(),
        
        PLD_SERVICE_URL: str(),

        HASH_SALT_ROUNDS: str(),
        JWT_KEY: str()
    });

    config = { ...config, ...clean };

    process.env = <any> { ...process.env, ...config };

    return config;
};
