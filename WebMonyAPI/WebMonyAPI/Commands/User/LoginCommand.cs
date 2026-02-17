using MediatR;
using WebMonyAPI.Dtos.Users;

namespace WebMonyAPI.Commands.User;

public record LoginCommand(LoginDto model) : IRequest<string>;

