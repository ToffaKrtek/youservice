import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { OrderService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {
  isNew = true;
  form: FormGroup | undefined;
  constructor(private route: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit(): void {
    let nowDate = new Date();
    this.form = new FormGroup( {
      way_start: new FormControl(null, [Validators.required]),
      way_end: new FormControl(null, [Validators.required]),
      time_created: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    })


    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     //Редактировние
    //     this.isNew = false;
    //   }
    //   //Добавление
    // })
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']) {
              this.isNew = false;
              return this.orderService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        order => {
          if(order) {
            this.form.patchValue({
              way_start: order.way_start.coordinates,
              way_end: order.way_end.coordinates,
              time_created: order.time_created,
              price: order.price,
            })
            MaterialService.updateTextInputs()
          }
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  onSubmit(){

  }

}
