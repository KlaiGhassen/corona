import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "app/navigation/global";

@Injectable({
    providedIn: "root"
})
export class AdministratorService {
    url: any;
    constructor(private http: HttpClient) {
        this.url = url;
    }

    getAgents() {
        return this.http.get<any>(url + "/api/administrator/agents");
    }

    getOneAgent(id) {
        return this.http.get<any>(url + "/api/administrator/agents/" + id);
    }

    addAgent(agent) {
        return this.http.post<any>(url + "/api/administrator/agents", agent);
    }

    updateAgent(agent) {
        return this.http.put<any>(
            url + "/api/administrator/agents/" + agent.id,
            agent
        );
    }

    deleteAgent(id) {
        return this.http.get<any>(url + "/api/administrator/agents/" + id);
    }
}
