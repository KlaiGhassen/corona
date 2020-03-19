import { AuthenticationService } from "./../authentication.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { GloablService } from "app/gloabl.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    err = "";
    type = 0;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _globalService: GloablService,
        private service: AuthenticationService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ["", [Validators.required]],
            password: ["", Validators.required]
        });
    }

    switchTo(type) {
        this.type = type;
    }

    login() {
        if (this.type === 0) this.loginAgent();
        else this.loginAdministrator();
    }

    loginAdministrator() {
        this.service
            .logInAdministrator(this.loginForm.getRawValue())
            .subscribe(res => {
                console.log(res);
                if (res.err)
                    this.err = "combinaison mot de passe/username eroné";
                else {
                    localStorage.setItem("token", res.token);
                    this._globalService.user = res.user;
                    this.router.navigate(["administrator/agents"]);
                    this._fuseConfigService.config = {
                        layout: {
                            navbar: {
                                hidden: true
                            },
                            toolbar: {
                                hidden: false
                            },
                            footer: {
                                hidden: false
                            },
                            sidepanel: {
                                hidden: true
                            }
                        }
                    };
                }
            });
    }

    loginAgent() {
        this.service.logIn(this.loginForm.getRawValue()).subscribe(res => {
            console.log(res);
            if (res.err) this.err = "combinaison mot de passe/username eroné";
            else {
                localStorage.setItem("token", res.token);
                this._globalService.user = res.user;
                this.router.navigate(["declarations"]);
                this._fuseConfigService.config = {
                    layout: {
                        navbar: {
                            hidden: true
                        },
                        toolbar: {
                            hidden: false
                        },
                        footer: {
                            hidden: false
                        },
                        sidepanel: {
                            hidden: true
                        }
                    }
                };
            }
        });
    }
}
