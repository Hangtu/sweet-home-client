import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DebtsService } from 'src/app/services/debts.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = this.fb.group({
    user: ['hangtu', Validators.required],
    password: ['1234', Validators.required],
  });

  constructor(private router: Router, private debtsService: DebtsService, private fb: FormBuilder) { }

  ngOnInit() {

  }

  onSubmit() {
    // console.table(this.loginForm.value);
    this.debtsService.login(this.loginForm.value).subscribe(data => {
        this.debtsService.setToken(data);
        this.router.navigate(['/debt']);
    },
    (err) => {
      console.log(err);
    });
  }

  login(user) {
       console.log(user);
  }

}
