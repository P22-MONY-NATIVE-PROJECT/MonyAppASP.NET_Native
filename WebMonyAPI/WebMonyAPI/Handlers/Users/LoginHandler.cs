using MediatR;
using WebMonyAPI.Commands.User;

namespace WebMonyAPI.Handlers.Users;

public class LoginHandler : IRequestHandler<LoginCommand, string>
{
    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        string token = string.Empty;
        if (request.model.Code=="12")
            token = "Сало";
        return token;
    }
}
