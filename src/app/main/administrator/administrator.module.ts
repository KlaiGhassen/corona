import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgentsComponent } from "./agents/agents.component";
import { AgentComponent } from "./agent/agent.component";
import { RouterModule } from "@angular/router";
import {
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule
} from "@angular/material";
import { FuseSharedModule } from "@fuse/shared.module";
import { NewAgentComponent } from "./new-agent/new-agent.component";

const routes = [
    {
        path: "agents",
        component: AgentsComponent
    },
    {
        path: "agents/new",
        component: NewAgentComponent
    },
    {
        path: "agents/:id",
        component: AgentComponent
    },
    {
        path: "agents/:id/new",
        component: AgentComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

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
        MatButtonModule,

        FuseSharedModule
    ],
    declarations: [AgentsComponent, AgentComponent, NewAgentComponent]
})
export class AdministratorModule {}
