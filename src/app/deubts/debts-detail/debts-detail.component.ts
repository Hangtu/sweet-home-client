import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debts-detail',
  templateUrl: './debts-detail.component.html',
  styleUrls: ['./debts-detail.component.css']
})
export class DebtsDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const item = this.route.snapshot.paramMap.get('params');
    console.log(JSON.parse(item));
  }

}
