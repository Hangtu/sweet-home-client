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
    user: ['', Validators.required],
    password: ['', Validators.required],
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
      const error = err.statusText;
      console.log('%c' + error, 'color: red; font-size:100px;');
    });
  }

  login(user) {
       console.log(user);
  }

}
