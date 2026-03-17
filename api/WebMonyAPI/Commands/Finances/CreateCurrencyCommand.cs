using MediatR;
using WebMonyAPI.Dtos.Finances;

namespace WebMonyAPI.Commands.Finances;

public record CreateCurrencyCommand(string Name,
                                    string Code,
                                    char Symbol,
                                    decimal DollarExchangeRate)
    : IRequest<CurrencyDto>;
