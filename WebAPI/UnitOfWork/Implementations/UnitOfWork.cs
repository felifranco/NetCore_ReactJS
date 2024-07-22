using System.Threading.Tasks;
using WebAPI.UnitOfWork.Interfaces;
using WebAPI.Repositories.Interfaces;
using WebAPI.Repositories.Implementations;
using WebAPI.Data;

namespace WebAPI.UnitOfWork.Implementations;

public class UnitOfWork : IUnitOfWork
{
    private readonly AccessContext _context;
    private IPermissionRepository _permissionRepository;
    private IPermissionTypeRepository _permissionTypeRepository;

    public UnitOfWork(AccessContext context)
    {
        _context = context;
        _permissionRepository ??= new PermissionRepository(_context);
        _permissionTypeRepository ??= new PermissionTypeRepository(_context);
    }

    public IPermissionRepository PermissionRepository
    {
        get
        {
            return _permissionRepository ??= new PermissionRepository(_context);
        }
    }

    public IPermissionTypeRepository PermissionTypeRepository
    {
        get
        {
            return _permissionTypeRepository ??= new PermissionTypeRepository(_context);
        }
    }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
