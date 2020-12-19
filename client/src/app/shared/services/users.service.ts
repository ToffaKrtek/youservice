import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) {

    }
    fetch(): Observable<User[]>{
        return this.http.get<User[]>('/api/users/')
    }
}