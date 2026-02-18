using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebMonyAPI.Dtos.Users;

namespace WebMonyAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync(string? search, int page, int pageSize);
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<UserDto> CreateAsync(UserDto dto);
        Task<bool> DeleteAsync(Guid id);
        // add any other operations you need
    }
}
