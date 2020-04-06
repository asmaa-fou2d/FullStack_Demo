import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  updateForm: FormGroup;
  employee: Employee;
  isLoaded: boolean = false;
  employeeId: number;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.GetEmployeeById(this.employeeId).subscribe((result: Employee) => {
      // console.log(result);
      this.employee = result;
      this.isLoaded = true;
      this.updateForm = this.fb.group({
        fullName: [this.employee.FullName, Validators.required],
        email: [this.employee.Email, Validators.required],
        jobTitle: [this.employee.JobTitle, Validators.required],
        salary: [this.employee.Salary, Validators.required],
        address: [this.employee.Address],
        Age: [this.employee.Age, Validators.required],
        IsActive: [this.employee.IsActive]
      });
    });
  }

  isValid(controlName: string, errorType: string): boolean {
    return (
      this.updateForm.get(controlName).hasError(errorType) &&
      this.updateForm.get(controlName).touched
    );
  }

  submit() {
    if (this.updateForm.valid) {
      const employee = <Employee>this.updateForm.value;
      employee.Id = this.employeeId;
      this.employeeService.UpdateEmployee(employee).subscribe((result: any) => {
        if (result) {
          this.toastr.success("Your employee has been updated successfully");
          this.router.navigate(['employees']);
        }
      });
    }
  }

}
