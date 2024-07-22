using System;
using System.Collections.Generic;

namespace WebAPI.Models.DTOs;

public class PermissionTypeDTO
{
    public int Id { get; set; }
    
    public string Descripcion { get; set; } = null!;
}
