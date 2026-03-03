using MediatR;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Commands.User;

public record LoginCommand(LoginDto model) : IRequest<string>;

