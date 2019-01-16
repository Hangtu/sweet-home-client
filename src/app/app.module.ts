import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeubtsComponent } from './deubts/deubts.component';

const appRoutes: Routes = [
  { path: 'deubt', component: DeubtsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DeubtsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // tslint:disable-next-line:max-line-length
    RouterModule.forRoot( // Registering the RouterModule.forRoot() in the AppModule imports makes the Router service available everywhere in the application.
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
