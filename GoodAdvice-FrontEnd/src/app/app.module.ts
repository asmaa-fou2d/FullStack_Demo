import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountService } from './services/account.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EmployeeService } from './services/employee.service';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/employees/update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeesListComponent,
    LoginComponent,
    NavBarComponent,
    BasicLayoutComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AccountService, EmployeeService, AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
