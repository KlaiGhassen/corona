import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private service: AuthenticationService,
        private router: Router
    ) {}
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.service.loggedIn()) {
            return true;
        } else {
            this.service.logOut();
            return false;
        }
    }
}
