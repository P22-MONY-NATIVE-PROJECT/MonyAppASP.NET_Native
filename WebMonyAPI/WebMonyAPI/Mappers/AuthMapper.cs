using AutoMapper;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.SeedData.Models;

namespace WebMonyAPI.Mappers;

public class AuthMapper : Profile
{
    public AuthMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
        CreateMap<RegisterDto, UserEntity>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
        CreateMap<GoogleAccountDto, UserEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
