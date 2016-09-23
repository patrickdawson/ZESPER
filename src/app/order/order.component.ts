import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ze-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;

  constructor() {
    this.orderForm = new FormGroup({
      'mainDishCount': new FormControl(),
      'sideDishCount': new FormControl()
    });
  }

  ngOnInit() {
  }

  onOrder() {
    console.log(this.orderForm);
  }

}
