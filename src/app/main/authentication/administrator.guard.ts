import { GloablService } from "app/gloabl.service";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class AdministratorGuard implements CanActivate {
    constructor(
        private globalService: GloablService,
        private service: AuthenticationService,
        private router: Router
    ) {}

    canActivate(): boolean {
        console.log("Inside guard");
        if (
            this.service.loggedIn() &&
            this.getDecodedAccessToken(localStorage.getItem("token")).role ===
                "administrator"
        ) {
            return true;
        } else {
            this.router.navigate(["error-404"]);
            this.service.logOut();
            return false;
        }
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    //   .pipe(
    //     map((user: any) => {
    //         if (user.role && user.role === "administrator") return true;
    //         else {
    //             this.service.logOut();
    //             return false;
    //         }
    //     }),
    //     err => {
    //         console.error("err :", err);
    //     }
    // );

    // {
    //     if (
    //         this.service.loggedIn() &&
    //         this.globalService.thisUser() &&
    //         typeof this.globalService.thisUser().role !== undefined && this.globalService.thisUser().role === 'administrator'
    //     ) {
    //         return true;
    //     } else {
    //         this.service.logOut();
    //         return false;
    //     }
    //     return true;
    // }
}
