import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/employees/update-employee/update-employee.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: BasicLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }, {
        path: 'employees',
        component: EmployeesListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update-employee/:id',
        component: UpdateEmployeeComponent,
        canActivate: [AuthGuard]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
