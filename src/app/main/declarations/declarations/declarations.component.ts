import { NotificationsService } from "./../../../notifications.service";
import { DeclarationsService } from "./../declarations.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { status, priority, type, gouvernorat } from "app/navigation/global";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-declarations",
    templateUrl: "./declarations.component.html",
    styleUrls: ["./declarations.component.scss"],
    animations: fuseAnimations
})
export class DeclarationsComponent implements OnInit {
    notifications = 0;

    gouvernorat: any;
    status: any;
    priority: any;
    type: any;

    loadingId = null;
    loadingField = null;

    dataSource: any;
    displayedColumns = [
        "id",
        "type",
        "title",
        "state",
        "city",
        "description",
        "status",
        "priority",
        "approved",
        "tel",
        "buttons"
        // { def: "id", show: true },
        // { def: "title", show: true },
        // { def: "description", show: true },
        // { def: "status", show: true }
        // { def: "role", show: true },
        // { def: "status", show: true },
        // { def: "confirmer", show: true },
        // { def: "buttons", show: true }
    ];
    data: any;

    selectedIndex: any;
    filterForm: FormGroup;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private service: DeclarationsService,
        private _formBuilder: FormBuilder,
        private _notificationService: NotificationsService
    ) {
        this.gouvernorat = gouvernorat;
        this.gouvernorat.unshift({ nom: null, subGouvernorat: [] });
        this.status = status;
        this.status.unshift({ value: null, text: null });
        this.priority = priority;
        this.priority.unshift({ value: null, text: null });
        this.type = type;
        this.type.unshift({ value: null, text: null });
    }

    ngOnInit() {
        this.service.getTickets().subscribe(res => {
            this.data = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log("ticket", this.dataSource);
        });
        this.initForm();

        this.gouvernorat.forEach(elem => {
            elem.subGouvernorat.unshift({ nom: null });
        });
        this.newDeclarations();
    }

    newDeclarations() {
        this._notificationService.listenToDeclarations().subscribe(data => {
            this.data.unshift(data[0]);
            this.dataSource = this.data;
            this.notifications = this.notifications + 1;
            console.log(this.notifications);
        });
    }

    closeNotifications() {
        this.notifications = 0;
        console.log(this.notifications);
    }

    search() {
        this.service
            .getTicketsSearch(this.filterForm.getRawValue())
            .subscribe(res => {
                this.dataSource = res;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    initForm() {
        this.filterForm = this._formBuilder.group({
            state: [null],
            city: [null],
            status: [null],
            type: [null],
            priority: [null]
        });
    }

    changePriority(id, index) {
        console.log("Bye");
        this.loadingId = id;
        this.loadingField = "priority";
        this.service.changePriority(id, index).subscribe(res => {
            console.log("Responce :", res);
            this.loadingId = null;
            this.loadingField = null;
            this.data.forEach(elem => {
                if (elem.id === id) {
                    elem.priority = index;
                }
            });
        });
    }

    changeStatus(id, index) {
        console.log("Hello");
        this.loadingId = id;
        this.loadingField = "status";
        this.service.changeStatus(id, index).subscribe(res => {
            console.log("Responce :", res);
            this.loadingId = null;
            this.loadingField = null;
            this.data.forEach(elem => {
                if (elem.id === id) {
                    elem.status = index;
                }
            });
        });
    }

    gouvernoratChange(e) {
        if (e === null) {
            this.filterForm.get("state").reset();
            this.filterForm.get("city").reset();
            this.selectedIndex = null;
        } else {
            console.log("doppi: ", e);

            this.gouvernorat.forEach((city, index) => {
                if (city.nom === e) {
                    this.selectedIndex = index;
                }
            });
        }
    }
}
