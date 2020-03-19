import { AuthenticationService } from "./authentication.service";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { tap, retry, catchError } from "rxjs/operators";
import {
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
    HttpInterceptor
} from "@angular/common/http";
import { of, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(
        private router: Router,
        private injector: Injector,
        private loaderService: FuseProgressBarService
    ) {}

    intercept(req, next) {
        this.showLoader();
        let authService = this.injector.get(AuthenticationService);
        let tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        });
        return next.handle(tokenizedReq).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.onEnd();
                }
            }),
            retry(5),
            catchError((error, caught) => {
                this.onEnd();
                //intercept the respons error and displace it to the console
                this.handleAuthError(error);
                return of(error);
            })
        ) as any;
    }

    private onEnd(): void {
        this.hideLoader();
    }
    private showLoader(): void {
        this.loaderService.show();
    }
    private hideLoader(): void {
        this.loaderService.hide();
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401) {
            //navigate /delete cookies or whatever
            //this.router.navigate([`auth/login`]);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            throw err;
            //return of(err.message);
        }
        throw err;
    }
}
