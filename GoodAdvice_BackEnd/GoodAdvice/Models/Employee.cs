
using System.ComponentModel.DataAnnotations;


namespace GoodAdvice.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Address { get; set; }

        [Required]
        public string JobTitle { get; set; }

        [Required]
        public double Salary { get; set; }

        public int Age { get; set; }

        public bool IsActive { get; set; }

    }
}