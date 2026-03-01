using AutoMapper;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.SeedData.Models;

namespace WebMonyAPI.Mappers;

public class AuthMapper : Profile
{
    public AuthMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
