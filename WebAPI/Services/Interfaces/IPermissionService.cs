using WebAPI.Models.DTOs;

namespace WebAPI.Services.Interfaces;

public interface IPermissionService
{
      Task<IEnumerable<PermissionDTO>> GetAllPermissionsAsync();
      Task<PermissionDTO> GetPermissionByIdAsync(int id);
      Task AddPermissionAsync(PermissionDTO permissionDto);
      Task UpdatePermissionAsync(PermissionDTO permissionDto);
      Task DeletePermissionAsync(int id);
}