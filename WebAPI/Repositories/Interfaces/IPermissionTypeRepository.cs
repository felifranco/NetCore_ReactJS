using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models.Entities;

namespace WebAPI.Repositories.Interfaces;

public interface IPermissionTypeRepository
{
    Task<IEnumerable<PermissionType>> GetAllAsync();
    Task<PermissionType?> GetByIdAsync(int id);
    Task AddAsync(PermissionType permissionType);
    void Update(PermissionType permissionType);
    void Delete(PermissionType permissionType);
}