import { Observable, Subject } from "rxjs";
import { url } from "./navigation/global";
import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root"
})
export class NotificationsService {
    private _notificationSubject: Subject<any> = new Subject();
    uri: any;
    private socket: any;
    constructor() {
        this.uri = url;
        this.socket = io(this.uri);
    }
    listenToDeclarations(): Observable<any> {
        this.socket.on("declarations", (data: string) => {
            this._notificationSubject.next(data);
        });

        return this._notificationSubject.asObservable();
    }
}
