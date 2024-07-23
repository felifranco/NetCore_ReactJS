using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Repositories.Interfaces;
using WebAPI.Data;
using WebAPI.Models.Entities;

namespace WebAPI.Repositories.Implementations;

public class PermissionTypeRepository : IPermissionTypeRepository
{
    private readonly AccessContext _context;
    private readonly DbSet<PermissionType> _dbSet;

    public PermissionTypeRepository(AccessContext context)
    {
        _context = context;
        _dbSet = _context.Set<PermissionType>();
    }

    public async Task<IEnumerable<PermissionType>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<PermissionType?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task AddAsync(PermissionType newPermissionType)
    {
        await _dbSet.AddAsync(newPermissionType);
    }
    
    public void Update(PermissionType updatePermission)
    {
        _dbSet.Update(updatePermission);
    }
    
    public void Delete(PermissionType permissionType)
    {
        _dbSet.Remove(permissionType);
    }
}