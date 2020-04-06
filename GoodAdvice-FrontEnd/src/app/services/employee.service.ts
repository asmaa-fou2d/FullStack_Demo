import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  // Base url
  baseurl = 'http://localhost:4501/api/employee/';
  constructor(private http: HttpClient) { }

  GetAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseurl + 'getAllEmployees');
  }

  GetEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseurl + 'getEmployeeById/' + id);
  }

  CreateEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.baseurl + 'createEmployee', employee);
  }

  UpdateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.baseurl + 'updateEmployee', employee);
  }

  DeleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseurl + 'deleteEmployee/' + id);
  }
}
