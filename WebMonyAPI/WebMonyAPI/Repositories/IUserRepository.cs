using WebMonyAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebMonyAPI.Entities;

namespace WebMonyAPI.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
    }
}
