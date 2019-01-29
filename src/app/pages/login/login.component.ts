import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DebtsService } from 'src/app/services/debts.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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

  constructor(private authService: AuthService, private router: Router, private debtsService: DebtsService, private fb: FormBuilder) { }

  ngOnInit() {

  }

  onSubmit() {
    this._loading = true;
    this.debtsService.login(this.loginForm.value).subscribe(data => {
        this.debtsService.setToken(data);
        this.router.navigate(['/debt']);
        this._loading = false;
    },
    (err) => {
      const error = err.statusText;
      console.log('%c' + error, 'color: red; font-size:100px;');
      this._loading = false;
    });
  }

  fbLogin() {
    console.log('fbLogin');
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    // this.authService.signOut();
  }

  googleLogin() {
   console.log('googleLogin');
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((data) => {
      console.log(data);
      console.log((data != null) ? 'true' : 'false');
    }, err => console.log(err));
  }

  signOut(): void {
    this.authService.signOut();
  }

}
