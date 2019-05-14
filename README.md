# message-api

Servidor de mensageria

## Desenvolvimento
- `docker build --rm -f "Dockerfile" -t message-api:latest .`
- `docker run --name message-api --rm -it -p 9090:9090/tcp message-api:latest`

## Publicando imagem
- `docker tag message-api message-api:latest`
- `docker push message-api:latest`