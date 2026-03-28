using MediatR;

namespace WebMonyAPI.Commands.Auth;

public record UpdatePushTokenCommand(string PushToken) : IRequest<bool>;
