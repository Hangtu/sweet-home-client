import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // for prod routes

import { AppComponent } from './app.component';
import { DeubtsComponent } from './deubts/deubts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthCanActivateGuard } from './guards/auth-can-activate.guard';
import { DebtsDetailComponent } from './deubts/debts-detail/debts-detail.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'debt', component: DeubtsComponent, canActivate: [AuthCanActivateGuard] , data : {title : 'Deudas'}},
  { path: 'debtsDetails', component: DebtsDetailComponent, canActivate: [AuthCanActivateGuard], data : {title : 'Detalle Deudas'}},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    DeubtsComponent,
    PageNotFoundComponent,
    DebtsDetailComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // tslint:disable-next-line:max-line-length
    RouterModule.forRoot( // Registering the RouterModule.forRoot() in the AppModule imports makes the Router service available everywhere in the application.
      appRoutes,
      { enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers : [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
