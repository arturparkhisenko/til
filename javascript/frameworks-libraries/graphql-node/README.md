# Server

## CLI Doker

[docker-compose docs](https://docs.docker.com/compose/reference/up/)

```shell
docker-compose up -d

docker-compose down
```

## CLI Prisma

[prisma docs](https://www.prisma.io/docs/prisma-cli-and-configuration/cli-command-reference/prisma-deploy-xcv9/)

```shell
export PRISMA_MANAGEMENT_API_SECRET="prisma" && prisma deploy

prisma delete

prisma generate
```

## URLS

- http://localhost:4466/_admin
- http://localhost:4466/

## Env

Create a `variables.env` file.
Variables from that file can be used as `${env:PRISMA_ENDPOINT}` in the `prisma.yml`.
Examples: PRISMA_ENDPOINT, PRISMA_SECRET, FRONTEND_URL, APP_JWT_SECRET, STRIPE_SECRET, PORT... and etc.
