import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debts-detail',
  templateUrl: './debts-detail.component.html',
  styleUrls: ['./debts-detail.component.css']
})
export class DebtsDetailComponent implements OnInit {

  @Output() changeTitle = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.changeTitle.emit('Details');
    const item = this.route.snapshot.paramMap.get('params');
    console.log(JSON.parse(item));
  }

}
