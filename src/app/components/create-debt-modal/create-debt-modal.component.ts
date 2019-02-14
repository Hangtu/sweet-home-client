import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, AfterContentInit } from '@angular/core';


@Component({
  selector: 'app-create-debt-modal',
  templateUrl: './create-debt-modal.component.html',
  styleUrls: ['./create-debt-modal.component.css']
})
export class CreateDebtModalComponent implements OnInit, AfterContentInit {

  debt: any = new Object();
  @Output() saveDebtModal = new EventEmitter();
  @Input() modal;
  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('deuda') deuda: ElementRef;
  @ViewChild('pago_min') pago_min: ElementRef;
  @ViewChild('limit_day') limit_day: ElementRef;

  _canSave = false;

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit() {

  }

  save() {
    const nombre = this.nombre.nativeElement.checkValidity();
  }

  onSubmit(form) {
    this.saveDebtModal.emit(form.value);
    form.reset();
    this.modal.close();
  }

}
