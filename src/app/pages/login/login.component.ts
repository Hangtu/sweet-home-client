import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  _loading = false;

  constructor(private router: Router, private debtsService: DebtsService, private fb: FormBuilder) { }

  ngOnInit() {

  }

  fbLogin() {
    this.debtsService.loginFB();
  }

  googleLogin() {
    this.debtsService.loginGoogle();
  }

  onSubmit() {
    this._loading = true;
    this.debtsService.login(this.loginForm.value).subscribe(data => {
      console.log(data);
      // this.debtsService.setToken(data.token);
      this.router.navigate(['/debt']);
      this._loading = false;
    },
      (err) => {
        const error = err.statusText;
        console.log('%c' + error, 'color: red; font-size:100px;');
        this._loading = false;
      });
  }
}
