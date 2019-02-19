import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtsService } from 'src/app/services/debts.service';
import { debounceTime } from 'rxjs/operators';

declare var swal: any;
declare var M: any;

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

  saveDebt() {
    const result = {};
    for (let i = 0; i < this.items.length; i++) {
      result[this.items[i].key] = this.items[i].value;
    }

    const payload = {
      newItem: result,
      oldItem: this.item
    };

    this.debtService.updateDebtContent(payload).subscribe(data => {
      if (data.status === 'ok') {
        this.item = result;
        M.toast({html: 'Item updated!'});
      }
    });
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


