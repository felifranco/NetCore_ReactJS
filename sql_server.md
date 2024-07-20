

https://hub.docker.com/r/microsoft/mssql-server


docker pull mcr.microsoft.com/mssql/server:2022-latest


docker run --name sqlserver -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=strong@Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest


