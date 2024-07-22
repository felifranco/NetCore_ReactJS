using System;
using System.Collections.Generic;

namespace WebAPI.Models.DTOs;

public partial class CreatePermissionDTO
{
    public string NombreEmpleado { get; set; } = null!;

    public string ApellidoEmpleado { get; set; } = null!;

    public int TipoPermisoId { get; set; }

    public DateOnly FechaPermiso { get; set; }
}
