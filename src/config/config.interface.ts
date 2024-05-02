export interface IServerConfig {
    url: string;
    prefix: string;
    port: string;
}

export interface IMongoConnectionConfig {
    uri: string;
    host: string;
    port: string;
    username: string;
    password: string;
    connectionTimeout: string;
    usersDatabase: string;
}

export interface IPLDService {
    url: string;
}

export interface IAuth {
    saltRounds: string;
    jwtKey: string;
}

export interface IConfig {
    environment: string;
    server: IServerConfig;
    mongoConnection: IMongoConnectionConfig;
    pldService: IPLDService;
    auth: IAuth;
}
