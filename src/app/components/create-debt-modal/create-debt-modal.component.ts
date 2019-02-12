import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-create-debt-modal',
  templateUrl: './create-debt-modal.component.html',
  styleUrls: ['./create-debt-modal.component.css']
})
export class CreateDebtModalComponent implements OnInit {

  debt: any = new Object();
  @Output() voted = new EventEmitter();
  @ViewChild('limit_day') limit_day: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  save(item) {
    console.log(this.limit_day.nativeElement.checkValidity());
    this.voted.emit(item);
  }

}
