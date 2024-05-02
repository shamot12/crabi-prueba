import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (serviceUrl: string, prefix: string) =>
    new DocumentBuilder()
        .setTitle('Prueba Técnica de Crabi - Samuel Hernández')
        .setDescription('Prueba Técnica de Crabi - Samuel Hernández')
        .addServer(`${serviceUrl}${prefix}`)
        .setVersion('1.0')
        .build();
