import { Injectable } from "@angular/core";
import { url } from "./../../navigation/global";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {
    url: any;

    constructor(private http: HttpClient, private router: Router) {
        this.url = url;
    }

    logIn(login) {
        return this.http.post<any>(`${url}/api/account/login`, login);
    }

    logInAdministrator(login) {
        return this.http.post<any>(
            `${url}/api/account/login/administrator`,
            login
        );
    }

    loggedIn() {
        return !!localStorage.getItem("token");
    }

    getToken() {
        return localStorage.getItem("token");
    }

    public logOut() {
        localStorage.removeItem("token");
        this.router.navigate(["/authentication/login"]);
    }
}
