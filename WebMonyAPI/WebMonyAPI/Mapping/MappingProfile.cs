using AutoMapper;
using WebMonyAPI.Entities;
using WebMonyAPI.Dtos.Users;

namespace WebMonyAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
