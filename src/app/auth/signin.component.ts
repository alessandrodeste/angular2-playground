import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-signin',
  template: `
    <div class="col-md-6 col-md-offset-3">
      <h2>Signin</h2>
      <form name="form" (ngSubmit)="f.form.valid && signin()" #f="ngForm" novalidate>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !email.valid }">
          <label for="email">E-Mail</label>
          <input type="text" class="form-control" name="email" [(ngModel)]="model.email" #email="ngModel" required />
          <div *ngIf="f.submitted && !email.valid" class="help-block">E-Mail is required</div>
        </div>
        <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
          <div *ngIf="f.submitted && !password.valid" class="help-block">Password is required</div>
        </div>
        <div class="form-group">
          <button [disabled]="loading" class="btn btn-primary">Sign in</button>
          <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class SigninComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signin() {    
    this.loading = true;
    this.authenticationService.signin(this.model.email, this.model.password)
      .subscribe(
        data => {
          this.authenticationService.getLoggedUserInfo()
            .subscribe(
              data => {                
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.alertService.error(error);
                this.loading = false;
              });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
