import { Component, OnInit } from '@angular/core';
import { Food } from '../shared';

@Component({
  selector: 'ze-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  meal = new Food('Leberkäse', 1.80);

  constructor() { }

  ngOnInit() {
  }

}
