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
        CreateMap<GoogleAccountModel, UserEntity>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.FirstName, opt => opt.MapFrom(src => src.Name))
                .ForMember(x => x.Email, opt => opt.MapFrom(src => src.Email));
    }
}
