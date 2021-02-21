# omnichat-api

A aplicação consiste em um CRUD de 'posts' que seriam postagens feitas por um usário, contendo título e descrição. Ela também permite a criação de usuários e autenticação, após o usuário for cadastrado. O banco de dados utilizado foi o sqlite, por praticidade.

## Variáveis ambiente

Crie um arquivo .env na raíz do projeto chamado '.env'. Para adicionar as variáveis ambiente necessárias, basta copiar o conteúdo do .env.example e atribuir valores a cada uma.

- NODE_ENV: Define o ambiente em que o programa está rodando
- APP_SECRET: Define o segredo a ser usado para geração e validação dos tokens jwt
- DATABASE_NAME: Define o nome do banco de dados a ser utilizado
- LOGGER_ALL_FILE: Especifica o caminho onde os arquivos de log de qualquer tipo serão armazenados (e.g. logs/all.log)
- LOGGER_ERRORS_FILE: Especifica o caminho onde os arquivos de log de erro serão armazenados

## Como rodar o programa

Primeiramente instale o gerenciador de pacotes yarn (https://classic.yarnpkg.com/en/docs/install/), o Node.js (https://nodejs.org/en/download/) e o git (https://git-scm.com/downloads). Depois em um terminal rode os seguintes comandos para executar o programa:

```shell
# Baixa o repositório
git clone https://github.com/zenatureza/omnichat-api

# Acessa o diretório
cd omnichat-api

# Instala os pacotes necessários
yarn install

# Gera o arquivo necessário para as migrations
cp ormconfig.example.dev.json ormconfig.json

# Inicializa o banco de dados
yarn typeorm migration:run

# Roda o servidor de desenvolvimento
yarn dev:server
```

## Testes

Para rodar os testes basta executar o seguinte comando na raiz do projeto:

```shell
yarn test
```

## Como usar a API

Como dito anteriormente, a api gerencia posts de usuários, e por isso é necessário antes de criar ou editar um post, que os usuários existam. Então, deve-se primeiramente criar um usuário, usando o método _POST na rota /users_ (ver abaixo com mais detalhes). Depois do usuário existir, é necessário que esse usuário se autentique na aplicação, para isso basta utilizar o método _POST na rota /sessions_ para criar uma sessão e obter um token para realizar as requisições. Com o token obtido agora sim é possível gerenciar posts, criar, editar, obter informações ou excluir, todas essas ações estão descritas abaixo.

As rotas disponíveis são:

- [POST] http://localhost:3333/users
  Cria um novo usuário:

request body:

```json
{
  "email": "myemail@provider.com",
  "password": "mypassword",
  "name": "username"
}
```

- [POST] http://localhost:3333/sessions
  Se autentica no sistema:

request body:

```json
{
  "email": "myemail@provider.com",
  "password": "mypassword"
}
```

- [POST] http://localhost:3333/posts
  Cria um novo post:

request body:

```json
{
  "title": "post title",
  "description": "post description"
}
```

necessário incluir o header:
`Authorization: Bearer ${token}`

- [PUT] http://localhost:3333/posts/:id
  Edita um post existente:

request body:

```json
{
  "title": "post title",
  "description": "post description"
}
```

necessário incluir o header:
`Authorization: Bearer ${token}`

- [DELETE] http://localhost:3333/posts/:id
  Exclui um post existente:

request body:

```json
{
  "title": "post title",
  "description": "post description"
}
```

necessário incluir o header:
`Authorization: Bearer ${token}`

- [GET] http://localhost:3333/posts/:id
  Obtém um post existente:

necessário incluir o header:
`Authorization: Bearer ${token}`

- [GET] http://localhost:3333/posts?page=page&take=take
  Busca posts de um usuário de forma paginada:

query parameters:

```shell
# opcional, com default = 1
page # indica de qual página está buscando

# opcional
take # indica quantos registros quer obter
```

necessário incluir o header:
`Authorization: Bearer ${token}`
