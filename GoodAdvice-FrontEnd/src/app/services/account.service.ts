import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AccountService {

    baseurl = 'http://localhost:4501/';
    constructor(private http: HttpClient) {
    }
    userAuth(userName, password) {
        debugger;
        let data = "grant_type=password&userName=" + userName + "&password=" + password;
        let header = new HttpHeaders({ 'Content-type': 'application/x-www-url-encoded', 'No-Auth': 'True' });
        return this.http.post(this.baseurl + 'token', data, { headers: header })
    }

    getUserData() {
        return this.http.get(this.baseurl + 'api/account/getAccountData');
    }
}
