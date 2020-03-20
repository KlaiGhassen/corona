import { AuthenticationService } from "./main/authentication/authentication.service";
import { Injectable, Injector } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { url } from "./navigation/global";

@Injectable({
    providedIn: "root"
})
export class GloablService {
    private currentUser: any = { usename: "" };
    private _userSubject: BehaviorSubject<any>;
    uri: any;
    constructor(private http: HttpClient, private injector: Injector) {
        this.uri = url;
        this._userSubject = new BehaviorSubject({ username: "" });
    }

    get user(): Observable<any> {
        return this._userSubject.asObservable();
    }

    thisUser() {
        return this.currentUser;
    }

    set user(value) {
        this.currentUser = value;
        this._userSubject.next(this.currentUser);
    }

    load() {
        let authService = this.injector.get(AuthenticationService);
        return new Promise((resolve, reject) => {
            if (authService.loggedIn()) {
                this.http
                    .get<any>(`${this.uri}/api/agent/ticket/current`)
                    .subscribe(
                        response => {
                            if (response.length === 1) {
                                this.currentUser = response[0];
                                this._userSubject.next(this.currentUser);
                                resolve(true);
                            } else {
                                authService.logOut();
                                this.currentUser = { username: "" };
                                this._userSubject.next(this.currentUser);
                                resolve(true);
                            }
                        },
                        err => {
                            authService.logOut();
                            this.currentUser = { username: "" };
                            this._userSubject.next(this.currentUser);
                            resolve(true);
                        }
                    );
            } else {
                authService.logOut();
                resolve(true);
            }
        });
    }
}
