import { Component, OnInit } from '@angular/core';
import { Meal } from '../shared';

@Component({
  selector: 'ze-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  meal = new Meal('Leberkäse');

  constructor() { }

  ngOnInit() {
  }

}
