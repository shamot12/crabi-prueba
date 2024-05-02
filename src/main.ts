import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { IServerConfig } from '@config/config.interface';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@src/config';
import { AppModule } from './app.module';

void (async(): Promise<void> => {
    
    const app = await NestFactory.create(AppModule, { });
    
    try {
        app.use(json({ limit: '1mb' }));
        app.use(urlencoded({ extended: true, limit: '1mb' }));
        // app.enableCors();
        app.use(helmet());

        app.useGlobalPipes(new ValidationPipe());

        const { url, port, prefix } = app
            .get<ConfigService>(ConfigService)
            .get<IServerConfig>('server');

        
        const document = SwaggerModule.createDocument(
            app,
            swaggerConfig(url, prefix)
        );
    
        SwaggerModule.setup(`${prefix}/swagger`, app, document);

        app.setGlobalPrefix(prefix);

        await app.listen(port);

        Logger.log(`Server running on ${url}${prefix}`);
    }
    catch (error) {
        Logger.error(error);
    }

    // eslint-disable-next-line no-undef
    async function closeGracefully(signal: NodeJS.Signals)
    {
        await app.close();
        process.kill(process.pid, signal);
    }

    process.once('SIGINT', closeGracefully);
    process.once('SIGTERM', closeGracefully);
    process.once('SIGUSR2', closeGracefully);
})();
    