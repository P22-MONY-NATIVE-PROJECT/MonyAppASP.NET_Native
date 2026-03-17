using MediatR;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Commands.Auth;

public record ResetPasswordCommand(AccountResetPasswordDto model) : IRequest<bool>;

