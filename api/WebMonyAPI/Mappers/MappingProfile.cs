using AutoMapper;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities;
using WebMonyAPI.Entities.Identity;

namespace WebMonyAPI.Mappers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserEntity, UserDto>();
    }
}
