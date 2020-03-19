import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeclarationsComponent } from "./declarations/declarations.component";
import { DeclarationComponent } from "./declaration/declaration.component";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule
} from "@angular/material";
import { MatDividerModule } from "@angular/material/divider";

import { MatMenuModule } from "@angular/material/menu";

const routes = [
    {
        path: "",
        component: DeclarationsComponent
    },

    {
        path: ":id",
        component: DeclarationComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        //MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        //MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        //MatTabsModule,
        MatMenuModule,
        MatDividerModule,

        FuseSharedModule
    ],
    declarations: [DeclarationsComponent, DeclarationComponent]
})
export class DeclarationsModule {}
