import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debts-detail',
  templateUrl: './debts-detail.component.html',
  styleUrls: ['./debts-detail.component.css']
})
export class DebtsDetailComponent implements OnInit {

  items: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const groupItems = [];
    const item = JSON.parse(this.route.snapshot.paramMap.get('params'));
    console.table(item);

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        groupItems.push({ key: key, value: item[key] });
      }
    }

    this.items = groupItems;
    this.route.snapshot.data['title'] = item.nombre;
  }

}
