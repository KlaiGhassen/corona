import { AdministratorService } from "./../administrator.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
    selector: "app-agents",
    templateUrl: "./agents.component.html",
    styleUrls: ["./agents.component.scss"]
})
export class AgentsComponent implements OnInit {
    dataSource: any;
    displayedColumns = ["username", "nom", "prenom", "cin", "tel", "buttons"];
    data: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private service: AdministratorService) {}

    ngOnInit() {
        this.service.getAgents().subscribe(res => {
            if (!res.error) {
                this.data = res;
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
