import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AdministratorService } from "../administrator.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-agent",
    templateUrl: "./agent.component.html",
    styleUrls: ["./agent.component.scss"]
})
export class AgentComponent implements OnInit {
    agentForm: FormGroup;
    agentId: any;
    agent: any;
    loadingEdit = false;
    message = "";
    isNew = "";
    constructor(
        private router: Router,
        private _formBuilder: FormBuilder,
        private service: AdministratorService
    ) {}

    ngOnInit() {
        this.initForm();
        this.agentId = parseInt(this.router.url.split("/")[3]);
        if (this.router.url.split("/")[4] === "new") {
            this.message = "Ajouter avec succés";
        }
        this.service.getOneAgent(this.agentId).subscribe(res => {
            this.agent = res[0];
            this.loadForm();
        });
    }

    initForm() {
        this.agentForm = this._formBuilder.group({
            nom: [null],
            prenom: [null],
            username: [null],
            password: [null],
            cin: [null],
            tel: [null]
        });
    }

    loadForm() {
        this.agentForm = this._formBuilder.group({
            nom: [this.agent.nom],
            prenom: [this.agent.nom],
            username: [this.agent.username],
            password: [this.agent.password],
            cin: [this.agent.cin],
            tel: [this.agent.tel]
        });
    }

    edit() {
        let agent = this.agentForm.getRawValue();
        agent.id = this.agentId;
        this.loadingEdit = true;
        this.service.updateAgent(agent).subscribe(res => {
            this.loadingEdit = false;
            this.agentForm.markAsPristine();
            this.message = "Modifier avec succes";
            setTimeout(() => {
                this.message = "";
            }, 10000);
        });
    }
}
