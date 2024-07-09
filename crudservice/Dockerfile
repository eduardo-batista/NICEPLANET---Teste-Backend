FROM node:latest

# Instale o netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto
COPY . .

# Adicione um script de inicialização
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Comando de inicialização
CMD ["/usr/local/bin/entrypoint.sh"]
