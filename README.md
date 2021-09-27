# CRUD usuário com ReactJS, NodeJS, MySQL e ExpressJS.

O backend está pronto e funcional, podendo ser testado pelo Postman através das rotas a seguir:

POST: http://localhost:8080/api/cadastros
Ação: Adiciona um usuário

GET: http://localhost:8080/api/cadastros
Ação: Retorna todos os usuários

GET {id}: http://localhost:8080/api/cadastros/id
Ação: Retorna um usuário pelo Id

PUT {id}: http://localhost:8080/api/cadastros/id
Ação: Atualiza um usuário pelo Id

GET {nome}: http://localhost:8080/api/cadastros?nome=fulano
Ação: Retorna todos os usuários cujo nome contém "fulano" (exemplo)

DELETE: http://localhost:8080/api/cadastros/
Ação: Remove todos os usuários

DELETE {id}: http://localhost:8080/api/cadastros/id
Ação: Remove um usuário pelo Id

# Pastas do projeto
client: frontend /
server: backend

### Para iniciar o servidor, acessar pelo terminal a pasta 'server' e rodar o comando: node server.js
### Para iniciar o front, acessar pelo terminal a pasta 'client' e rodar o comando: npm start

O servidor estará rodando na porta 8080 ou padrão.
o client estará rodando na porta 3000 ou padrão.

O frontend foi conectado com o backend, só não foi finalizado por completo.
