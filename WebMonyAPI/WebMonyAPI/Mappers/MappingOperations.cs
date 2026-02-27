using AutoMapper;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Extensions;

namespace WebMonyAPI.Mappers;

public class MappingOperations : Profile
{
    public MappingOperations()
    {
        CreateMap<OperationEntity, OperationDto>()
            .ForMember(x => x.CategoryName, opt => opt.MapFrom(x => x.Category!.Name))
            .ForMember(x => x.BalanceName, opt => opt.MapFrom(x => x.Balance!.Name));

        CreateMap<OperationChargeEntity, OperationChargeDto>()
            .ForMember(x => x.Type, opt => opt.MapFrom(src => src.Type.ToUkrainian()))
            .ForMember(x => x.ApplicationType, opt => opt.MapFrom(src => src.ApplicationType.ToUkrainian()));
    }
}
