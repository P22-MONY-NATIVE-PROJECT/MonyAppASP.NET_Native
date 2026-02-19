using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebMonyAPI.Dtos.Users;
using WebMonyAPI.Entities;
using WebMonyAPI.Repositories;

namespace WebMonyAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync(string? search, int page, int pageSize)
        {
            var users = await _repo.ListAllAsync();

            var filtered = string.IsNullOrWhiteSpace(search)
                ? users
                : users.Where(u =>
                    u.FirstName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    u.LastName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    u.Email.Contains(search, StringComparison.OrdinalIgnoreCase));

            var paged = filtered
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return _mapper.Map<IEnumerable<UserDto>>(paged);
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            var user = await _repo.GetByIdAsync(id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateAsync(UserDto dto)
        {
            var user = _mapper.Map<User>(dto);
            await _repo.AddAsync(user);
            await _repo.SaveChangesAsync();
            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var user = await _repo.GetByIdAsync(id);
            if (user == null) return false;
            _repo.Delete(user);
            await _repo.SaveChangesAsync();
            return true;
        }
    }
}
