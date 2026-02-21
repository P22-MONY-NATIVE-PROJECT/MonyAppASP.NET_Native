using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Entities.Operations;

[Table("tbl_expense_operations")]
public class ExpenseOperationEntity : BaseOperationEntity
{
    public long ExpenseCategoryId { get; set; }
    public ExpenseCategoryEntity? ExpenseCategory { get; set; }
}
