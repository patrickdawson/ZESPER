import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'ze-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('childModal')
  public childModal: ModalDirective;

  private modalHeaderColor: string;
  private modalTitle: string;
  private modalBody: string;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
  }

  deleteAllOrders() {
    this.orderService.deleteAllOrders()
      .then(() => {
        this.modalHeaderColor = '#11C954';
        this.modalTitle = 'Erfolgreich';
        this.modalBody = 'Alle Bestellungen wurden gelöscht.';
        this.childModal.show();
      })
      .catch((error) => {
        this.modalHeaderColor = '#C92203';
        this.modalTitle = 'Fehler';
        this.modalBody = `Fehler beim Löschen der Bestellungen:\n${error}`;
        this.childModal.show();
      });
  }

  // Modal dialog stuff


  /*  public showChildModal():void {
   this.childModal.show();
   }

   public hideChildModal():void {
   this.childModal.hide();
   }*/

}
