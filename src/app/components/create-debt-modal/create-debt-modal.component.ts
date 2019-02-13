import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-create-debt-modal',
  templateUrl: './create-debt-modal.component.html',
  styleUrls: ['./create-debt-modal.component.css']
})
export class CreateDebtModalComponent implements OnInit {

  debt: any = new Object();
  @Output() voted = new EventEmitter();
  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('deuda') deuda: ElementRef;
  @ViewChild('pago_min') pago_min: ElementRef;
  @ViewChild('limit_day') limit_day: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  save(item) {
    const nombre = this.nombre.nativeElement.checkValidity();
    const deuda = this.deuda.nativeElement.checkValidity();
    const pago_min = this.pago_min.nativeElement.checkValidity();
    const limit_day = this.limit_day.nativeElement.checkValidity();
    if (nombre && deuda && pago_min && limit_day) {
      this.voted.emit(item);
    }
  }

  checkEmpty(event) {
    const limit_day = this.limit_day.nativeElement.checkValidity();
    console.log(limit_day);
    console.log(this.limit_day.nativeElement.validity);
  }

}
