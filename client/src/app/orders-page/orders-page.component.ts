import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared/interfaces';
import { OrderService } from '../shared/services/orders.service'

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  
  orders$: Observable<Order[]> | undefined;
  constructor(private ordersService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.ordersService.fetch()
  }

}
