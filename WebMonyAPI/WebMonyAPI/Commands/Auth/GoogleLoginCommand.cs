using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebMonyAPI.Commands.Auth;

public record GoogleLoginCommand(string token) : IRequest<string>;
