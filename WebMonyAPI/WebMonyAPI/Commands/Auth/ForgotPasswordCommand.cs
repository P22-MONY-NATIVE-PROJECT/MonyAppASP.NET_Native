using MediatR;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Commands.Auth;

public record ForgotPasswordCommand(AccountForgotPasswordDto modal) : IRequest<bool>;
