using AutoMapper;
using WebMonyAPI.Entities;
using WebMonyAPI.Dtos.Users;

namespace WebMonyAPI.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
