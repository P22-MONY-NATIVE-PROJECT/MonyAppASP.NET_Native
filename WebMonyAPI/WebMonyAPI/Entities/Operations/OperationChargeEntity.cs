using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Operations;

public enum ChargeType
{
    Tax = 1,
    Commission = 2
}

public enum ChargeApplicationType
{
    Add = 1,
    Subtract = 2,
    Included = 3
}
[Table("tbl_operation_charges")]
public class OperationChargeEntity : BaseEntity<long>
{
    public decimal? Percentage { get; set; }
    public decimal? Amount { get; set; }
    public ChargeType Type { get; set; }
    public ChargeApplicationType ApplicationType { get; set; }
    public long OperationId { get; set; }
    public OperationEntity? Operation { get; set; }
}
