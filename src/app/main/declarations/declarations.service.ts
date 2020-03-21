import { url } from "./../../navigation/global";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class DeclarationsService {
    url: any;
    constructor(private http: HttpClient) {
        this.url = url;
    }
    getTickets() {
        return this.http.get<any>(url + "/api/agent/ticket/");
    }

    getTicketsSearch(parameters) {
        if (parameters.state === null) delete parameters.state;
        if (parameters.city === null) delete parameters.city;
        if (parameters.priority === null) delete parameters.priority;
        if (parameters.status === null) delete parameters.status;
        if (parameters.type === null) delete parameters.type;
        return this.http.get<any>(url + "/api/agent/ticket/", {
            params: parameters
        });
    }
    downloadMedia(fileName) {
        this.http;
        return this.http.get(`${url}/api/ticket/download/${fileName}`, {
            responseType: "arraybuffer"
        });
    }
    getOneTicket(id) {
        return this.http.get<any>(url + "/api/agent/ticket/" + id);
    }

    getNotes(id) {
        return this.http.get<any>(url + "/api/agent/ticket/notes/" + id);
    }

    setNote(note) {
        return this.http.post<any>(url + "/api/agent/ticket/notes", note);
    }

    editNote(note) {
        return this.http.put<any>(
            url + "/api/agent/ticket/notes/" + note.id,
            note
        );
    }

    getApprovals(id) {
        return this.http.get<any>(url + "/api/agent/ticket/approvals/" + id);
    }

    changePriority(id, priority) {
        return this.http.put<any>(`${url}/api/agent/ticket/priority/${id}`, {
            priority: priority
        });
    }

    changeStatus(id, status) {
        return this.http.put<any>(`${url}/api/agent/ticket/status/${id}`, {
            status: status
        });
    }

    changeType(id, type) {
        return this.http.put<any>(`${url}/api/agent/ticket/type/${id}`, {
            type: type
        });
    }
}
