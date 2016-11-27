import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ze-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private version: string;

  constructor() { }

  ngOnInit() {
    this.version = 'V0.2.0';
  }

}
