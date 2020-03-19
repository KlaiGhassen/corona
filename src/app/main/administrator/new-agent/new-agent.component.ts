import { AdministratorService } from "./../administrator.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-new-agent",
    templateUrl: "./new-agent.component.html",
    styleUrls: ["./new-agent.component.scss"]
})
export class NewAgentComponent implements OnInit {
    agentForm: FormGroup;
    err = "";
    loadingAdd = false;
    constructor(
        private _formBuilder: FormBuilder,
        private service: AdministratorService,
        private router: Router
    ) {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.agentForm = this._formBuilder.group({
            nom: [null, [Validators.required]],
            prenom: [null, [Validators.required]],
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            cin: [null],
            tel: [null]
        });
    }

    add() {
        this.loadingAdd = true;
        this.service.addAgent(this.agentForm.getRawValue()).subscribe(res => {
            this.loadingAdd = false;
            if (res.err && res.err === "usernameExists") {
                this.err = "Ce username existe déja";
            } else {
                console.log(res);
                this.router.navigate([
                    "administrator/agents/" + res[0].id + "/new"
                ]);
            }
        });
    }
}
