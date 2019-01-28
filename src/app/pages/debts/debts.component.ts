import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DebtsService } from '../../services/debts.service';

@Component({
  selector: 'app-deubts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.css']
})

export class DebtsComponent implements OnInit {

  _loading = true;
  total = '0';
  quincena = [];
  quincena1 = [];
  quincena2 = [];
  quincena_pendientes = 0;
  quincena_total = '0';

  quincena1_pendientes = 0;
  quincena1_total = '0';

  quincena2_pendientes = 0;
  quincena2_total = '0';
  mobile = false;
  Q = '1';

  constructor(private http: HttpClient, private debtsService: DebtsService) {
    debtsService.getDebts().subscribe(data => {
      this.loadAllDebts(data);
    });

    // this.loadAllDebtsLocalStorage();

  }

  loadAllDebtsLocalStorage() {
    let flag = false;

     const storedQ1 = JSON.stringify(localStorage.getItem('Q1'));
      if (typeof storedQ1 !== 'undefined' && storedQ1 !== 'null') {
        const storeD1 = JSON.parse(localStorage.getItem('Q1'));
        storeD1.forEach(p => {
          this.total = (parseFloat(this.total) + parseFloat(p.deuda)).toFixed(2);
          if (p.quincena === '1' || p.quincena === '1.2') {
            this.quincena1.push(p);
            this.quincena1_total = (parseFloat(this.quincena1_total) + parseFloat(p.pagoMinimo)).toFixed(2);
            if (p.pagado === 'no') {
              this.quincena1_pendientes++;
            } else {
              this.quincena1_total = (parseFloat(this.quincena1_total) - parseFloat(p.pagoMinimo)).toFixed(2);
            }
          }
        });
         flag = true;
      }

      const storedQ2 = JSON.stringify(localStorage.getItem('Q2'));
      if (typeof storedQ2 !== 'undefined' &&  storedQ2 !== 'null' ) {
          const storeD2 = JSON.parse(localStorage.getItem('Q2'));
          storeD2.forEach(p => {
            if (p.quincena === '2' || p.quincena === '1.2') {
              this.quincena2.push(p);
              this.quincena2_total = (parseFloat(this.quincena2_total) + parseFloat(p.pagoMinimo)).toFixed(2);
              if (p.pagado === 'no') {
                this.quincena2_pendientes++;
              } else {
                this.quincena2_total = (parseFloat(this.quincena2_total) - parseFloat(p.pagoMinimo)).toFixed(2);
              }
            }
          });
          flag = true;
      }

      if (flag) { this.Q = '1';  this.setQ(this.Q); return; }
  }


  loadAllDebts(data: Object | { data: { deudas: any; }; }[]) {
    const debts = data[0].data.deudas;
    const debts2 = JSON.parse(JSON.stringify(debts)); // CLONE THE OBJECT
    debts.forEach((p) => { // Q1
      this.total = (parseFloat(this.total) + parseFloat(p.deuda)).toFixed(2);
      if (p.quincena === '1' || p.quincena === '1.2') {
        this.quincena1.push(p);
        this.quincena1_total = (parseFloat(this.quincena1_total) + parseFloat(p.pagoMinimo)).toFixed(2);
        if (p.pagado === 'no') {
          this.quincena1_pendientes++;
        } else {
          this.quincena1_total = (parseFloat(this.quincena1_total) - parseFloat(p.pagoMinimo)).toFixed(2);
        }
      }
    });
    debts2.forEach(p => { // Q2
      if (p.quincena === '2' || p.quincena === '1.2') {
        this.quincena2.push(p);
        this.quincena2_total = (parseFloat(this.quincena2_total) + parseFloat(p.pagoMinimo)).toFixed(2);
        if (p.pagado === 'no') {
          this.quincena2_pendientes++;
        } else {
          this.quincena2_total = (parseFloat(this.quincena2_total) - parseFloat(p.pagoMinimo)).toFixed(2);
        }
      }
    });

    this.setQ(this.Q);
    this._loading = false;
  }

  ngOnInit() {
    if (window.screen.width <= 600) { // 768px portrait
      this.mobile = true;
    }
  }

  getColor(item) {
    if (item === 'no') {
      return '#ff7043';
    } else {
      return 'white';
    }
  }

  updateHeadValues(item) {
    if (item.pagado === 'si') {
      if (this.Q === '1') {
        this.quincena1_pendientes--;
        this.quincena1_total = (parseFloat(this.quincena1_total) - parseFloat(item.pagoMinimo)).toFixed(2);
      } else {
        this.quincena2_pendientes--;
        this.quincena2_total = (parseFloat(this.quincena2_total) - parseFloat(item.pagoMinimo)).toFixed(2);
      }
    }

    if (item.pagado === 'no') {// if is not paid
      if (this.Q === '1') {
        this.quincena1_pendientes++;
        this.quincena1_total = (parseFloat(this.quincena1_total) + parseFloat(item.pagoMinimo)).toFixed(2);
      } else {
        this.quincena2_pendientes++;
        this.quincena2_total = (parseFloat(this.quincena2_total) + parseFloat(item.pagoMinimo)).toFixed(2);
      }
    }
  }

  changeStatus(item) { // update pendings & total by Q
    item.pagado = (item.pagado === 'si') ? 'no' : 'si';
    this.updateHeadValues(item);
    this.setQ(this.Q);
    this.saveData();
  }

  setQ(q) { // change defaults values
    this.Q = q;
    if (q === '1') {
      this.quincena = this.quincena1;
      this.quincena_total = this.quincena1_total;
      this.quincena_pendientes = this.quincena1_pendientes;
    }
    if (q === '2') {
      this.quincena = this.quincena2;
      this.quincena_total = this.quincena2_total;
      this.quincena_pendientes = this.quincena2_pendientes;
    }
  }

  getQ() {
    return this.Q === '1' ? true : false;
  }

  saveData() {
    // localStorage.setItem('Q1', JSON.stringify(this.quincena1));
    // localStorage.setItem('Q2', JSON.stringify(this.quincena2));
    this.debtsService.updateDebts();
  }

}
