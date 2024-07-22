using System;
using System.Collections.Generic;

namespace WebAPI.Models.Entities;

public partial class Permission
{
    /// <summary>
    /// Unique ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Employee Forename
    /// </summary>
    public string NombreEmpleado { get; set; } = null!;

    /// <summary>
    /// Employee Surname
    /// </summary>
    public string ApellidoEmpleado { get; set; } = null!;

    /// <summary>
    /// Permission Type ID
    /// </summary>
    public int TipoPermisoId { get; set; }

    /// <summary>
    /// Permission granted on Date
    /// </summary>
    public DateOnly FechaPermiso { get; set; }

    /// <summary>
    /// Permission Type
    /// </summary>
    public PermissionType TipoPermiso { get; set; } = null!;
}
