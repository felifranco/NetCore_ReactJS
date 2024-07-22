CREATE TABLE master.dbo.PermissionType (
	Id int IDENTITY(1,1) NOT NULL,
	Descripcion varchar(100) NOT NULL,
	CONSTRAINT PermissionType_PK PRIMARY KEY (Id)
);
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Unique ID', 'schema', N'dbo', 'table', N'PermissionType', 'column', N'Id';
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Permission description', 'schema', N'dbo', 'table', N'PermissionType', 'column', N'Descripcion';

CREATE TABLE master.dbo.Permission (
	Id int IDENTITY(1,1) NOT NULL,
	NombreEmpleado varchar(100) NOT NULL,
	ApellidoEmpleado varchar(100) NOT NULL,
	TipoPermiso int NOT NULL,
	FechaPermiso date NOT NULL,
	CONSTRAINT Permission_PK PRIMARY KEY (Id)
);
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Unique ID', 'schema', N'dbo', 'table', N'Permission', 'column', N'Id';
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Employee Forename', 'schema', N'dbo', 'table', N'Permission', 'column', N'NombreEmpleado';
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Employee Surname', 'schema', N'dbo', 'table', N'Permission', 'column', N'ApellidoEmpleado';
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Permission Type', 'schema', N'dbo', 'table', N'Permission', 'column', N'TipoPermiso';
EXEC master.sys.sp_addextendedproperty 'MS_Description', N'Permission granted on Date', 'schema', N'dbo', 'table', N'Permission', 'column', N'FechaPermiso';


