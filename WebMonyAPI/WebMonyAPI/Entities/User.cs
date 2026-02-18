using System;

namespace WebMonyAPI.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName  { get; set; } = string.Empty;
        public string Email     { get; set; } = string.Empty;
        public bool   IsActive  { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
