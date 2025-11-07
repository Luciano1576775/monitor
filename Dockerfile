# Usa imagem Node.js oficial
FROM node:18

# Define diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o código da aplicação
COPY server.js ./

# Expõe porta do app
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
