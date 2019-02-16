import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtsService } from 'src/app/services/debts.service';

declare var swal: any;

@Component({
  selector: 'app-debts-detail',
  templateUrl: './debts-detail.component.html',
  styleUrls: ['./debts-detail.component.css']
})
export class DebtsDetailComponent implements OnInit {

  items: any;
  item: any;

  constructor(private route: ActivatedRoute, private debtService: DebtsService) { }

  ngOnInit() {
    const groupItems = [];
    this.item = JSON.parse(this.route.snapshot.paramMap.get('params'));
    // console.table(this.item);

    for (const key in this.item) {
      if (this.item.hasOwnProperty(key)) {
        groupItems.push({ key: key, value: this.item[key] });
      }
    }

    this.items = groupItems;
    this.route.snapshot.data['title'] = this.item.nombre;
  }


  deleteDebt() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this debt!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.debtService.deleteDebt(this.item).subscribe(x => {
          swal('Poof! Your debt has been deleted!', {
            icon: 'success',
          });
          this.debtService.goToDebt();
        });
      }
    });
  }
}
