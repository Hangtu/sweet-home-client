import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // for prod routes

import { AppComponent } from './app.component';
import { DebtsComponent } from './pages/debts/debts.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthCanActivateGuard } from './guards/auth-can-activate.guard';
import { DebtsDetailComponent } from './pages/debts-detail/debts-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';

import { ErrorInterceptor } from './interceptor/error-interceptor';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'debt', component: DebtsComponent, canActivate: [AuthCanActivateGuard] , data : {title : 'Deudas'}},
  { path: 'debtsDetails', component: DebtsDetailComponent, canActivate: [AuthCanActivateGuard], data : {title : 'Detalle Deudas'}},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    DebtsComponent,
    PageNotFoundComponent,
    DebtsDetailComponent,
    HeaderComponent,
    LoginComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers : [{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
