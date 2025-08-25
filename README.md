# Docker Node.js + Nginx Full Cycle

Projeto com aplicação Node.js, MySQL e proxy reverso Nginx usando Docker Compose.

## Arquitetura

- **Node.js**: Aplicação web que conecta ao MySQL e exibe lista de nomes
- **MySQL**: Banco de dados para armazenar os nomes
- **Nginx**: Proxy reverso na porta 8080

## Como usar

### Executar o projeto

```bash
# Clonar e navegar para o diretório
cd docker-node-nginx

# Buildar e rodar os containers
docker-compose up --build -d

# Acessar no navegador
http://localhost:8080
```

### Comandos úteis

```bash
# Ver logs dos containers
docker-compose logs -f

# Parar os containers
docker-compose down

# Rebuild forçado
docker-compose up --build --force-recreate
```

## Funcionalidades

- A aplicação adiciona um nome aleatório no MySQL a cada acesso
- Exibe todos os nomes cadastrados em uma lista HTML
- Proxy reverso com Nginx para melhor performance