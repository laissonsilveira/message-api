# message-api

Servidor de mensageria

## Docker

### Desenvolvimento

- `docker build --rm -f "Dockerfile" -t message-api:latest .`
- `docker run --name message-api --rm -it -p 9090:9090/tcp message-api:latest`



## Mongo

MongoDB 4.0.4
Como instalar? Clique aqui
Como acessar mongo? mongo --host <HOSTNAME> --port <PORT>

### Criar usuários do banco

use admin;
db.createUser({user:"USUARIO_ROOT",pwd:"SENHA_ROOT", roles:[{role:"root",db:"admin"}]});

Os inseridos devem ser configurados no arquivo de configuração (config/default.json)
"database": {
  ...
  "user": "USUARIO_ROOT",
  "pass": "SENHA_ROOT"
  ...
}

### Habilitar Autenticação

Editar /etc/mongod.conf e habilitar a linha security:
security:
  authorization: enabled
Mais informações aqui e aqui

### Inserir usuário de sistema admin

mongo message-api -u 'USUARIO_ROOT' -p 'SENHA_ROOT' --authenticationDatabase 'admin';

db.users.insert({"username": "admin","password":"1c46c18d116e5ff76b026510b54e603660c6954b","name": "Administrador"});//password:adminpwd

### Autenticando

mongo message-api -u 'api_user' -p 'api_pwd' --authenticationDatabase 'admin' --eval 'db.users.insert({"username": "admin","password":"1c46c18d116e5ff76b026510b54e603660c6954b","name": "Administrador"})'


DOC API: https://laissonsilveira.github.io/message-api/