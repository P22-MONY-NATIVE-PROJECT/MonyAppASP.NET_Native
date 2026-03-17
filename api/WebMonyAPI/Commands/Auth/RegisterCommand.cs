using MediatR;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Commands.Auth;

public record RegisterCommand(RegisterDto model) : IRequest<TokenDto>;
