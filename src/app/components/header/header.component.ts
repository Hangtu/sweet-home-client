import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtsService } from 'src/app/services/debts.service';

declare var jquery: any;
declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  title = 'Sweet Home';
  appName = 'Sweet Home';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private debtsService: DebtsService) {
    $(document).ready(function () {
      $('.sidenav').sidenav();
    });
  }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['title'];
  }

  logout() {
    swal({
      title: 'Do you want to log out??',
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.debtsService.authSignOut();
        }
      });
  }
}
