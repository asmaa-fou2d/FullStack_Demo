import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createForm: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      jobTitle: ['', Validators.required],
      salary: ['', Validators.required],
      address: [''],
      Age: ['', Validators.required],
      IsActive: [false]

    });
  }

  isValid(controlName: string, errorType: string): boolean {
    return (
      this.createForm.get(controlName).hasError(errorType) &&
      this.createForm.get(controlName).touched
    );
  }

  submit() {
    if (this.createForm.valid) {
      const employee = <Employee>this.createForm.value;
      this.employeeService.CreateEmployee(employee).subscribe((result: any) => {
        if (result) {
          this.toastr.success("Your employee has been added successfully");
          this.router.navigate(['employees']);
        }
      });
    }
  }
}
