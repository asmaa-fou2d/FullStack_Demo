import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isValid(controlName: string, errorType: string): boolean {
    return (
      this.loginForm.get(controlName).hasError(errorType) &&
      this.loginForm.get(controlName).touched
    );
  }

  submit() {
    if (this.loginForm.valid) {
      const user = <LoginModel>this.loginForm.value;
      this.accountService.userAuth(user.userName, user.password).subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/dashboard']);
      }
        , (err: HttpErrorResponse) => {
          this.toastr.error("some thing went wrong please try again later");
        }
      )
    }
  }
}
