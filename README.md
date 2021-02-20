# omnichat-api

A aplicação consiste em um CRUD de 'posts' que seriam postagens feitas por um usário, contendo título e descrição. Ela também permite a criação de usuários e autenticação, após o usuário for cadastrado.

## Como rodar o programa

Primeiramente instale o gerenciador de pacotes yarn (https://classic.yarnpkg.com/en/docs/install/), o Node.js (https://nodejs.org/en/download/) e o git (https://git-scm.com/downloads). Depois em um terminal rode os seguintes comandos para executar o programa:

```shell
# Baixa o repositório
git clone https://github.com/zenatureza/omnichat-api

# Acessa o diretório
cd omnichat-api

# Instala os pacotes necessários
yarn install

# Inicializa o banco de dados
yarn typeorm migration:run

# Roda o servidor de desenvolvimento
yarn dev:server
```

## Como usar a API

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
