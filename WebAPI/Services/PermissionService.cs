using WebAPI.UnitOfWork.Interfaces;
using WebAPI.Models.Entities;
using WebAPI.Models.DTOs;
using AutoMapper;

namespace WebAPI.Services;

public class PermissionService
{
    private IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public PermissionService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PermissionDTO>> GetAllPermissionsAsync()
    {
        var permissions = await _unitOfWork.PermissionRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<PermissionDTO>>(permissions);
    }

    public async Task<PermissionDTO> GetPermissionByIdAsync(int id)
    {
        var permission = await _unitOfWork.PermissionRepository.GetByIdAsync(id);
        return _mapper.Map<PermissionDTO>(permission);
    }
    
    public async Task AddPermissionAsync(PermissionDTO permissionDto)
    {
        var permission = _mapper.Map<Permission>(permissionDto);
        await _unitOfWork.PermissionRepository.AddAsync(permission);
        await _unitOfWork.CompleteAsync();
    }

    public async void UpdatePermissionAsync(PermissionDTO permissionDto)
    {
        var permission = _mapper.Map<Permission>(permissionDto);
        _unitOfWork.PermissionRepository.Update(permission);
        await _unitOfWork.CompleteAsync();
    }

    public async void DeletePermissionAsync(int id){
        var permission = await _unitOfWork.PermissionRepository.GetByIdAsync(id);
        _unitOfWork.PermissionRepository.Delete(permission);
        await _unitOfWork.CompleteAsync();
    }
}