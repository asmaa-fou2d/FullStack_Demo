namespace GoodAdvice.Migrations
{
    using GoodAdvice.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<GoodAdvice.Models.GoodAdviceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(GoodAdvice.Models.GoodAdviceContext context)
        {
            context.Employees.AddOrUpdate(
            new Employee { FullName = "Asmaa Fouad", Email = "asmaa.fouad@gmail.com", JobTitle = ".Net Developer", Salary = 10000, Address = "Giza, Egypt", Age = 28, IsActive = true },
            new Employee { FullName = "Menna Ahmed", Email = "menna.ahmed@gmail.com", JobTitle = "Java Developer", Salary = 12000, Address = "Maadi, Egypt", Age = 30, IsActive = true },
            new Employee { FullName = "Ahmed Mohamed", Email = "ahmed.mohamed@gmail.com", JobTitle = "IOS Developer", Salary = 14000, Address = "October, Egypt", Age = 32, IsActive = true },
            new Employee { FullName = "Ali Ahmed", Email = "ali.ahmed@gmail.com", JobTitle = "Hr Manager", Salary = 16000, Address = "Maadi, Egypt", Age = 34, IsActive = false }
            );

            var userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(context));

            context.Users.AddOrUpdate(
                new IdentityUser { Email = "admin@gmail.com", UserName = "Admin", EmailConfirmed = true, PhoneNumberConfirmed = true, PasswordHash = userManager.PasswordHasher.HashPassword("Abc@123") });

            context.SaveChanges();
        }
    }
}
