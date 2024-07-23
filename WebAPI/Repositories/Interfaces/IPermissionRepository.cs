using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models.Entities;

namespace WebAPI.Repositories.Interfaces;

public interface IPermissionRepository
{
    Task<IEnumerable<Permission>> GetAllAsync();
    Task<Permission?> GetByIdAsync(int id);
    Task AddAsync(Permission permission);
    void Update(Permission permission);
    void Delete(Permission permission);
}