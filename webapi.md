![net_core](media/asp-net-core-web-api.png)

# .Net Core WebAPI

## Tabla de contenido

- [Versión](#versión)
- [Creación del proyecto](#creación-del-proyecto)
- [Correr el proyecto](#correr-el-proyecto)
- [Entity Framework](#entity-framework)
  - [SQL Server](#sql-server)
  - [Conexión](#conexión)
  - [Creación de la base de datos](#creación-de-la-base-de-datos)
  - [Migraciones](#migraciones)
    - [Migración manual](#migración-manual)
- [Estructura del proyecto](#estructura-del-proyecto)

## Versión

Se tiene instalada la versión 8 de **dotnet** en la distribución de Linux Fedora, se utilizó la [documentación oficial](https://learn.microsoft.com/es-mx/dotnet/core/install/linux-fedora) para la instalación del SDK:

```
$ dotnet --version
8.0.105
```

## Creación del proyecto

Se utilizará la [CLI de .NET](https://learn.microsoft.com/es-mx/dotnet/core/tools/) para crear un nuevo proyecto:

```
dotnet new webapi -o WebAPI
```

Luego de creado el proyecto ingresamos en él

```
cd WebAPI
```

Agremamos el archivo `.gitignore` para que solo se suban archivos necesarios al repositorio:

```
dotnet new gitignore
```

## Correr el proyecto

Corremos el proyecto por primera vez

```
$ dotnet run
Compilando...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5055
```

Como se puede ver en la salida de la terminal, el proyecto se despliega en `http://localhost:5055`, esta configuración se encuentra dentro de `profiles > http > applicationUrl` del archivo [WebAPI/Properties/launchSettings.json](WebAPI/Properties/launchSettings.json)

El proyecto tiene un endpoint configurado de forma predeterminada

```
http://localhost:5055/weatherforecast
```

al ingresar a él se puede visualizar que el proyecto corre correctamente. La referencia al endpoint de prueba se encuentra en el archivo [WebAPI/Program.cs](WebAPI/Program.cs).

## Entity Framework

Se utilizará la [Entity Framework documentation hub](https://learn.microsoft.com/en-us/ef/) como guía para instalar y configurar el paquete.

### SQL Server

En la sección `Supported databases` de la guía elegimos [SQL Server](https://learn.microsoft.com/en-us/ef/core/providers/sql-server/?tabs=dotnet-core-cli) como la base de datos a utilizar. Instalamos el paquete:

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

### Conexión

En la sección `Fundamentals` de la guía elegimos [Connection strings](https://learn.microsoft.com/en-us/ef/core/miscellaneous/connection-strings) para crear la cadena de conexión con la base de datos.

De acuerdo a los datos del contenedor y la base de datos; más información en [sql_server.md](sql_server.md). Crear la siguiente cadena de conexión en el archivo [WebAPI/appsettings.json](WebAPI/appsettings.json):

```json
"ConnectionStrings": {
    "AccessContext": "Server=localhost;Database=master;User Id=sa;Password=strong@Password;TrustServerCertificate=true;"
  }
```

Crear el contexto de la base de datos en el archivo [WebAPI/Data/AccessContext.cs](WebAPI/Data/AccessContext.cs)

```cs
using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Entities;

namespace WebAPI.Data;

public class AccessContext : DbContext
{
    public AccessContext(DbContextOptions<AccessContext> options) : base(options)
    { }

    public DbSet<PermissionType> PermissionType => Set<PermissionType>();
    public DbSet<Permission> Permission => Set<Permission>();
}
```

En este archivo también se encuentran asociadas las entidades _PermissionType_ y _Permission_. La definición de estas entidades se encuentra en [WebAPI/Models/Entities/PermissionType.cs](WebAPI/Models/Entities/PermissionType.cs) y [WebAPI/Models/Entities/Permission.cs](WebAPI/Models/Entities/Permission.cs) respectivamente.

Luego de haber creado la implementación de `DbContext` y creado la cadena de conexión, se agregará el servicio en el archivo [WebAPI/Program.cs](WebAPI/Program.cs)

```cs
builder.Services.AddDbContext<AccessContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AccessContext")));
```

### Creación de la base de datos

Se utilizará el método `CreateDbIfNotExists()` para crear la base de datos en caso de que no exista. La definición de la función se encuentra en [WebAPI/Data/Extensions.cs](WebAPI/Data/Extensions.cs). Luego se llama la función desde el archivo [WebAPI/Program.cs](WebAPI/Program.cs)

```cs
//La siguiente instrucción se puede comentar si la base de datos ya existe
app.CreateDbIfNotExists();
```

### Migraciones

Las migraciones se pueden realizar manualmente y así no requerir la llamada de `app.CreateDbIfNotExists()` puesto que se llama cada vez que se inicia el proyecto, para eso se debe agregar las herramientas necesarias para EF Core. Con estas herramientas se pueden crear migraciones y sincronización de la base de datos con los modelos del código:

Instalar paquetes:

```
dotnet tool install --global dotnet-ef
```

Para poder usar las herramientas en un proyecto específico, se agrega el paquete

```
dotnet add package Microsoft.EntityFrameworkCore.Design
```

#### Migración manual

Crear una migración

```
dotnet ef migrations add InitialCreate --context AccessContext
```

en `--context` se especifíca el nombre de la clase que implementa `DbContext`.

Correr el siguiente comando para aplicar la migración

```
dotnet ef database update --context AccessContext
```

Al inspeccionar la base de datos se podrá visualizar las nuevas tablas y sus relaciones.

## Estructura del proyecto

El proyecto utiliza Repository pattern, Unit of Work pattern, DTOs, Services y Controllers. Estos están distribuidos de la siguiente forma:

```
.
├── Controllers
│   ├── PermissionController.cs
│   └── PermissionTypeController.cs
├── Data
│   ├── AccessContext.cs
│   └── Extensions.cs
├── Mappings
│   └── AutoMapperProfile.cs
├── Models
│   ├── DTOs
│   │   ├── CreatePermissionDTO.cs
│   │   ├── PermissionDTO.cs
│   │   ├── PermissionTypeDTO.cs
│   │   └── UpdatePermissionDTO.cs
│   └── Entities
│       ├── Permission.cs
│       └── PermissionType.cs
├── Repositories
│   ├── Implementations
│   │   ├── PermissionRepository.cs
│   │   └── PermissionTypeRepository.cs
│   └── Interfaces
│       ├── IPermissionRepository.cs
│       └── IPermissionTypeRepository.cs
├── Services
│   ├── PermissionService.cs
│   └── PermissionTypeService.cs
├── UnitOfWork
│   ├── Implementations
│   │   └── UnitOfWork.cs
│   └── Interfaces
│       └── IUnitOfWork.cs
```

La carpeta `Mappings` contiene a la clase `AutoMapperProfile` en el archivo [WebAPI/Mappings/AutoMapperProfile.cs](WebAPI/Mappings/AutoMapperProfile.cs). Esta clase se utiliza para el mapeo entre DTOs y Entities, los DTOs se utilizan en los Services y Controllers.

Antes de poder utilizar el AutoMapper se debe instalar con el siguiente comando. La versión es una referencia únicamente.

```
dotnet add package AutoMapper --version 13.0.1
```
