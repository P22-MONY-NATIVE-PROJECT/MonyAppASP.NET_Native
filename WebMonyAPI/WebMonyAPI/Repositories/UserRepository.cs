using Microsoft.EntityFrameworkCore; 
using WebMonyAPI.Dtos.Users;
using WebMonyAPI.Entities;
using System.Threading.Tasks;
using AutoMapper;
using WebMonyAPI.Data;

namespace WebMonyAPI.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly IMapper _mapper;

        public UserRepository(AppDbContext ctx, IMapper mapper)
            : base(ctx)
        {
            _mapper = mapper;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
