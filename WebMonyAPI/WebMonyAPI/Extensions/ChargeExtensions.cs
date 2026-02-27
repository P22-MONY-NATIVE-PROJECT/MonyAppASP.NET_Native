using WebMonyAPI.Entities.Operations;

namespace WebMonyAPI.Extensions;

public static class ChargeExtensions
{
    public static string ToUkrainian(this ChargeType type)
    {
        return type switch
        {
            ChargeType.Tax => "Податок",
            ChargeType.Commission => "Комісія",
            _ => "Невідомо"
        };
    }

    public static string ToUkrainian(this ChargeApplicationType type)
    {
        return type switch
        {
            ChargeApplicationType.Add => "Додати",
            ChargeApplicationType.Subtract => "Відняти",
            _ => "Невідомо"
        };
    }
}
