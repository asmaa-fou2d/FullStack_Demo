import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[];
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.employeeService.GetAllEmployees().subscribe((result: Employee[]) => {
      this.employees = result;
    });
  }

  deleteEmployee(id) {
    this.employeeService.DeleteEmployee(id).subscribe((result: any) => {
      if (result) {
        this.employees = this.employees.filter(obj => obj.Id !== id);
        this.toastr.success("Your employee has been deleted successfully");
      }
    });
  }

  goToCreate() {
    this.router.navigate(['/create-employee']);
  }

  goToUpdate(id) {
    this.router.navigate(['update-employee/' + id]);
  }

}
