using System;
using System.Collections.Generic;

namespace WebAPI.Models.DTOs;

public class PermissionDTO
{
    public int Id { get; set; }

    public string NombreEmpleado { get; set; } = null!;

    public string ApellidoEmpleado { get; set; } = null!;

    public int TipoPermisoId { get; set; }

    public DateOnly FechaPermiso { get; set; }
}
