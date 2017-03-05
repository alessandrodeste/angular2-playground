import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-header></app-header>      
      <div>
        <alert></alert>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {


}
