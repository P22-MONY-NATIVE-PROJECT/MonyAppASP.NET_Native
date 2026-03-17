using MediatR;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Commands.Auth;

public record GoogleLoginCommand(GoogleLoginDto Model) : IRequest<TokenDto>;
