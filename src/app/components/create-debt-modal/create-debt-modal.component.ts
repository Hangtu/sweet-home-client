import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-create-debt-modal',
  templateUrl: './create-debt-modal.component.html',
  styleUrls: ['./create-debt-modal.component.css']
})
export class CreateDebtModalComponent implements OnInit {

  debt: any = new Object();
  @Output() voted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save(item) {
     this.voted.emit(item);
  }

}
