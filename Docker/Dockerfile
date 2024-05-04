# Establecer la imagen base
FROM node:18-alpine

# Crear el directorio de la aplicación en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json /usr/src/app

# Instalar las dependencias
RUN npm config set legacy-peer-deps true
RUN npm install

# Copiar el resto del código de la aplicación
COPY . /usr/src/app

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]