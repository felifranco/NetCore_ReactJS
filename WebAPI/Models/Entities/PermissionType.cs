using System;
using System.Collections.Generic;

namespace WebAPI.Models.Entities;

public partial class PermissionType
{
    /// <summary>
    /// Unique ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Permission description
    /// </summary>
    public string Descripcion { get; set; } = null!;
}
