# Usa a imagem base oficial do NGINX
FROM nginx:alpine

# Copia o arquivo de configuração do proxy para dentro do container
COPY default.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80 (padrão HTTP)
EXPOSE 80

# Comando padrão do NGINX (já vem na imagem base)
CMD ["nginx", "-g", "daemon off;"]
