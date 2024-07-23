using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Repositories.Interfaces;
using WebAPI.Data;
using WebAPI.Models.Entities;

namespace WebAPI.Repositories.Implementations;

public class PermissionRepository : IPermissionRepository
{
    private readonly AccessContext _context;
    private readonly DbSet<Permission> _dbSet;

    public PermissionRepository(AccessContext context)
    {
        _context = context;
        _dbSet = _context.Set<Permission>();
    }

    public async Task<IEnumerable<Permission>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<Permission?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task AddAsync(Permission newPermission)
    {
        await _dbSet.AddAsync(newPermission);
    }
    
    public void Update(Permission updatePermission)
    {
        _dbSet.Update(updatePermission);
    }
    
    public void Delete(Permission permission)
    {
        _dbSet.Remove(permission);
    }
}