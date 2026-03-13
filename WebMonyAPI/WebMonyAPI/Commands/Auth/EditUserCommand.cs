using MediatR;
using WebMonyAPI.Dtos.Auth;
 
namespace WebMonyAPI.Commands.Auth;
 
public record EditUserCommand(EditUserDto Model, string UserId) : IRequest<string>;
