import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // for prod routes

import { AppComponent } from './app.component';
import { DeubtsComponent } from './deubts/deubts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'deubt', component: DeubtsComponent },
  { path: '', redirectTo: 'deubt', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

// { path: '', redirectTo: 'deubt', pathMatch: 'full' }, { path: '**', component: 'pageNotFoundComponent' }

@NgModule({
  declarations: [
    AppComponent,
    DeubtsComponent,
    PageNotFoundComponent,
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
