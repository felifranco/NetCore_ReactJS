using WebAPI.UnitOfWork.Interfaces;
using WebAPI.Models.Entities;
using WebAPI.Models.DTOs;
using AutoMapper;

namespace WebAPI.Services;

public class PermissionTypeService
{
    private IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public PermissionTypeService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PermissionTypeDTO>> GetAllPermissionTypesAsync()
    {
        var permissionTypes = await _unitOfWork.PermissionTypeRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<PermissionTypeDTO>>(permissionTypes);
    }

    public async Task<PermissionTypeDTO> GetPermissionTypeByIdAsync(int id)
    {
        var permissionType = await _unitOfWork.PermissionTypeRepository.GetByIdAsync(id);
        return _mapper.Map<PermissionTypeDTO>(permissionType);
    }
    
    public async Task AddPermissionTypeAsync(PermissionTypeDTO permissionTypeDto)
    {
        var permissionType = _mapper.Map<PermissionType>(permissionTypeDto);
        await _unitOfWork.PermissionTypeRepository.AddAsync(permissionType);
        await _unitOfWork.CompleteAsync();
    }

    public async Task UpdatePermissionTypeAsync(PermissionTypeDTO permissionTypeDto)
    {
        var permissionType = _mapper.Map<PermissionType>(permissionTypeDto);
        _unitOfWork.PermissionTypeRepository.Update(permissionType);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeletePermissionTypeAsync(int id){
        var permissionType = await _unitOfWork.PermissionTypeRepository.GetByIdAsync(id);
        if(permissionType != null)
        {
            _unitOfWork.PermissionTypeRepository.Delete(permissionType);
            await _unitOfWork.CompleteAsync();
        }
    }
}