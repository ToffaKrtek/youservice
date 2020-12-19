import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {

    }
    fetch(): Observable<Order[]>{
        return this.http.get<Order[]>('/api/orders')
    }
}