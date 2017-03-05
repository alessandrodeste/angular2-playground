import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light">
      <a [routerLink]="['/']" class="navbar-brand">Angular 2 Playground</a>
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/signin']">Sign In</a>
        </li>,
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/signup']">Sign Up</a>
        </li>
      </ul>
    </nav>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
