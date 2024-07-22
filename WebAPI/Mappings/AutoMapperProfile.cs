using AutoMapper;
using WebAPI.Models.DTOs;
using WebAPI.Models.Entities;

namespace WebAPI.Mappings;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Permission, PermissionDTO>().ReverseMap();
        CreateMap<PermissionType, PermissionTypeDTO>().ReverseMap();
    }
}
