import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-deubts',
  templateUrl: './deubts.component.html',
  styleUrls: ['./deubts.component.css']
})
export class DeubtsComponent implements OnInit {

  total = 0.00;
  pendientes = 0;
  pagoMinimo = '';
  quincena1 = [];
  quincena2 = [];

  quincena1_pendientes = 0;
  quincena1_total = 0;

  quincena2_pendientes = 0;
  quincena2_total = '';
  mobile = false;



  constructor(private http: HttpClient) {
    this.http.get('https://still-mountain-46943.herokuapp.com/findOne').subscribe(data => {
      const debts = data[0].data.deudas;
      let sumMinimo = 0;
      let quincena2Total = 0;
      debts.forEach((p) => {
        this.total += parseFloat(p.deuda);
        sumMinimo += parseFloat(p.pagoMinimo);
        this.pagoMinimo = sumMinimo.toFixed(2);
        if (p.pagado === 'no') {
          this.pendientes++;
        }
        if (p.quincena === '1' || p.quincena === '1.2') {
          this.quincena1.push(p);
          this.quincena1_total += parseFloat(p.pagoMinimo);
          if (p.pagado === 'no') {
            this.quincena1_pendientes++;
          }
        }
        if (p.quincena === '2' || p.quincena === '1.2') {
          this.quincena2.push(p);
          quincena2Total += parseFloat(p.pagoMinimo);
          this.quincena2_total = quincena2Total.toFixed(2);
          if (p.pagado === 'no') {
            this.quincena2_pendientes++;
          }
        }
      });
    });
  }

  ngOnInit() {
    console.log(window.screen.width);
    if (window.screen.width <= 600) { // 768px portrait
       this.mobile = true;
    }
  }

  getColor(item) {
    if (item === 'no') {
      return '#e57373';
    } else {
      return 'white';
    }

  }

}
