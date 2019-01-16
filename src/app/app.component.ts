import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sweet Home';
  showMenu = true;
  constructor(public router: Router) {
    this.router.navigate(['/deubt']);
     /*router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
            (event.url === '/deubt') ? this.showMenu = false : this.showMenu = true;
        }
      });*/
    }

}
