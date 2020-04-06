using GoodAdvice.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GoodAdvice.Controllers
{
    public class EmployeeController : BaseAPIController
    {
        //public HttpResponseMessage GetAllEmployees()
        //{
        //    using (GoodAdviceContext dbContext = new GoodAdviceContext())
        //    {
        //        var Employees = dbContext.Employees.ToList();
        //        return Request.CreateResponse(HttpStatusCode.OK, Employees);
        //    }
        //}

        [HttpGet]
        [Route("api/employee/getAllEmployees")]
        [Authorize]
        public IHttpActionResult GetAllEmployees()
        {
            using (GoodAdviceContext dbContext = new GoodAdviceContext())
            {
                var employees = dbContext.Employees.ToList();
                return ReturnResponse(employees, ModelState);
            }
        }

        [HttpGet]
        [Route("api/employee/getEmployeeById/{id}")]
        public IHttpActionResult GetEmployeeById(int id)
        {
            using (GoodAdviceContext dbContext = new GoodAdviceContext())
            {
                var employee = dbContext.Employees.FirstOrDefault(emp => emp.Id == id);
                if (employee == null)
                {
                    ModelState.AddModelError("Get Employee", "This employee is not found");
                    return ReturnResponse(null, ModelState);
                }
                return ReturnResponse(employee, ModelState);
            }
        }

        [HttpPost]
        [Route("api/employee/createEmployee")]
        public IHttpActionResult CreateEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid || employee == null)
            {
                return ReturnResponse(null, ModelState);
            }
            using (GoodAdviceContext dbContext = new GoodAdviceContext())
            {
                dbContext.Employees.Add(employee);
                dbContext.SaveChanges();
                return ReturnResponse(employee.Id, ModelState);
            }
        }

        [HttpPut]
        [Route("api/employee/updateEmployee")]
        public IHttpActionResult UpdateEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid || employee == null)
            {
                return ReturnResponse(null, ModelState);
            }
            using (GoodAdviceContext dbContext = new GoodAdviceContext())
            {
                var emp = dbContext.Employees.FirstOrDefault(e => e.Id == employee.Id);
                if (emp == null)
                {
                    ModelState.AddModelError("Update Employee", "This employee is not found");
                    return ReturnResponse(null, ModelState);
                }

                emp.FullName = employee.FullName;
                emp.Email = employee.Email;
                emp.Age = employee.Age;
                emp.JobTitle = employee.JobTitle;
                emp.Salary = employee.Salary;
                emp.IsActive = employee.IsActive;
                dbContext.Employees.AddOrUpdate(employee);
                dbContext.SaveChanges();
                return ReturnResponse(employee.Id, ModelState);
            }
        }

        [HttpDelete]
        [Route("api/employee/deleteEmployee/{id}")]
        public IHttpActionResult DeleteEmployee(int id)
        {
            using (GoodAdviceContext dbContext = new GoodAdviceContext())
            {
                var employee = dbContext.Employees.FirstOrDefault(emp => emp.Id == id);
                if (employee == null)
                {
                    ModelState.AddModelError("delete Employee", "This employee is not found");
                    return ReturnResponse(null, ModelState);
                }
                dbContext.Employees.Remove(employee);
                dbContext.SaveChanges();
                return ReturnResponse(true, ModelState);
            }
        }

    }
}
