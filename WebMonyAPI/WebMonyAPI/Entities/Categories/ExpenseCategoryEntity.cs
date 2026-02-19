using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebMonyAPI.Entities.Categories;

[Table("tbl_expense_category")]
public class ExpenseCategoryEntity : CategoryBaseEntity {}
