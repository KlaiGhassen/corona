import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { DeclarationsService } from "../declarations.service";
import { gouvernorat, priority, type } from "app/navigation/global";
import {
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    ActivatedRoute,
    Route,
    Router
} from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: "app-declaration",
    templateUrl: "./declaration.component.html",
    styleUrls: ["./declaration.component.scss"],
    animations: fuseAnimations
})
export class DeclarationComponent implements OnInit {
    gouvernorat: any;
    status: any;
    priority: any;
    type: any;

    loadingPriority = false;
    loadingStatus = false;
    loadingType = false;

    notes = [];
    typeOfMedia: any;
    ticket: any;
    ticketID: number;

    snapshot: any;
    media = null;
    noteField = "";
    noteId = null;
    noteIndex = null;

    approvals = [];
    approvalsNumber = 0;
    constructor(
        private service: DeclarationsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _sanitizer: DomSanitizer
    ) {
        this.gouvernorat = gouvernorat;
        this.status = status;
        this.priority = priority;
        this.type = type;
        this.snapshot = router.routerState.snapshot;
    }

    ngOnInit() {
        this.ticketID = parseInt(this.router.url.split("/")[2]);
        this.getTicket();
        this.getNotes();
        this.getApprovals();
    }

    getTicket() {
        this.service.getOneTicket(this.ticketID).subscribe(res => {
            this.ticket = res[0];
            this.service.downloadMedia(this.ticket.media).subscribe(res => {
                if (this.ticket.media.substr(0, 5) === "video") {
                    this.typeOfMedia = "video";
                    this.media = new Blob([new Uint8Array(res)], {
                        type: "video/mp4"
                    });
                    this.media = URL.createObjectURL(this.media);
                }
                if (this.ticket.media.substr(0, 5) === "audio") {
                    this.typeOfMedia = "audio";

                    this.media = new Blob([new Uint8Array(res)], {
                        type: "audio/mp3"
                    });
                    this.media = URL.createObjectURL(this.media);
                }
                if (this.ticket.media.substr(0, 5) === "image") {
                    this.typeOfMedia = "image";

                    this.media = new Blob([new Uint8Array(res)], {
                        type: "image/png"
                    });
                    this.media = URL.createObjectURL(this.media);
                }
                this.media = this._sanitizer.bypassSecurityTrustResourceUrl(
                    this.media
                );
                console.log(this.media);

                /*      var bytes = new Uint8Array(res);
                     this.media = "data:video/mp4;base64," + encode(bytes);
                     console.log(this.media) */
            });
        });
    }
    getNotes() {
        this.service.getNotes(this.ticketID).subscribe(res => {
            console.log("Notes :", res);
            if (!res.err) this.notes = res;
        });
    }

    getApprovals() {
        this.service.getApprovals(this.ticketID).subscribe(res => {
            console.log("approvals :", res);
            this.approvals = res;
            this.approvalsNumber = this.approvals.length;
        });
    }
    changePriority(id, index) {
        this.loadingPriority = true;
        this.service.changePriority(id, index).subscribe(res => {
            this.ticket.priority = index;
            this.loadingPriority = false;
        });
    }

    changeStatus(id, index) {
        this.loadingStatus = true;
        this.service.changeStatus(id, index).subscribe(res => {
            this.ticket.status = index;
            this.loadingStatus = false;
        });
    }

    changeType(id, index) {
        this.loadingType = true;
        this.service.changeType(id, index).subscribe(res => {
            this.ticket.type = index;
            this.loadingType = false;
        });
    }

    addNote() {
        let note = {
            description: this.noteField,
            ticketId: this.ticketID
        };
        this.service.setNote(note).subscribe(res => {
            this.noteField = "";
            this.notes.unshift(res[0]);
            console.log("resp :", res);
        });
    }

    editNote() {
        let note = this.notes[this.noteIndex];
        note.description = this.noteField;
        this.service.editNote(note).subscribe(res => {
            this.notes[this.noteIndex].description = this.noteField;
            this.noteId = null;
            this.noteField = "";
            this.noteIndex = null;
        });
    }

    startEditingNote(note) {
        this.noteId = note.id;
        this.noteField = note.description;
        this.noteIndex = this.notes.indexOf(note);
        console.log("index :", this.noteIndex);
    }

    annuler() {
        this.noteId = null;
        this.noteField = "";
        this.noteIndex = null;
    }
}
