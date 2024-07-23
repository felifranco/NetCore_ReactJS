![sql_server_docker](media/sql_server_docker.jpeg)
# Docker

Se utilizará Docker para levantar una base de datos **MS SQL Server**.

## Pull

Descarga de la imagen desde el sitio oficial de [Docker Hub](https://hub.docker.com/r/microsoft/mssql-server)

```shell
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

## Contenedor

Crear un contenedor para la base de datos

```shell
docker run --name sqlserver -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=strong@Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

Donde:

- User = sa
- Password = strong@Password
