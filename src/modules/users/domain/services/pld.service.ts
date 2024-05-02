import { Logger, Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { Observable, catchError, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { PLDRequest, PLDResponse } from "../interfaces";

const observe = async <T, R>(source: Observable<T>, project: (value: T) => R, errorMessage: string) => {
    return await lastValueFrom(source.pipe(
        map(project),
        catchError((e) => {
            Logger.error(errorMessage);
            Logger.error(JSON.stringify(e.response?.data));

            throw new HttpException(e.response?.data, e.response?.status);
        })
    ));
};

@Injectable()
export class PLDService {
    private readonly logger = new Logger(PLDService.name);
    private readonly baseURL: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
        const { url } = this.configService.getOrThrow('pldService');
        // this.baseURL = `${url}:${port}`;
        this.baseURL = `${url}`;
    }

    async checkBlacklistStatus(clientInfo: PLDRequest): Promise<PLDResponse> {
        this.logger.log('Request to PLD service');

        const observable = this.httpService.post<PLDResponse>(this.baseURL, clientInfo);

        return await observe(observable,
            (res) => res.data,
            'Error on request to PLD service.'
        );
    }

}