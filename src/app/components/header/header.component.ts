import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtsService } from 'src/app/services/debts.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Sweet Home';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private debtsService: DebtsService) { }

  ngOnInit() {
     this.title = this.activatedRoute.snapshot.data['title'];
  }

  logout() {
    this.debtsService.logout();
    this.router.navigate(['/']);
  }

}
