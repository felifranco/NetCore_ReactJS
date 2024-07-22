using System;
using System.Threading.Tasks;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.UnitOfWork.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IPermissionRepository PermissionRepository { get; }
    IPermissionTypeRepository PermissionTypeRepository { get; }
    Task<int> CompleteAsync();    
}