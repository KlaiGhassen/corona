import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Error404pageComponent } from "./error404page.component";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";

const routes = [
    {
        path: "error-404",
        component: Error404pageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), MatIconModule, FuseSharedModule],
    declarations: [Error404pageComponent]
})
export class Error404pageModule {}
