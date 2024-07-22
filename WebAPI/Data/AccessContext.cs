using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Entities;

namespace WebAPI.Data;

public class AccessContext : DbContext
{
    public AccessContext(DbContextOptions<AccessContext> options) : base(options)
    { }
    
    public DbSet<PermissionType> PermissionType => Set<PermissionType>();
    public DbSet<Permission> Permission => Set<Permission>();
}