import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import {
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";

const routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full"
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ],
    declarations: [LoginComponent]
})
export class AuthenticationModule {}
