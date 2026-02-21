using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Entities.Operations;

[Table("tbl_income_operations")]
public class IncomeOperationEntity : BaseOperationEntity
{
    public long IncomeCategoryId { get; set; }
    public IncomeCategoryEntity? IncomeCategory { get; set; }
}
