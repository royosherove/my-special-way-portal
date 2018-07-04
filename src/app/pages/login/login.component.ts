import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  rememberMe: boolean;
  loginFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login() {
    try {
      const loginResponse = await this.authenticationService.login(
        this.model.username,
        this.model.password,
        this.rememberMe,
      );

      if (!loginResponse) {
        console.warn('login.component::login:: login error');
        this.loginFailed = true;
        return;
      }

      this.router.navigate([this.returnUrl]);
    } catch (err) {
      console.error(`login.component::login:: error in authentication ${err}`);
      this.loginFailed = true;
      // TODO: handle error in authetication
    } finally {
      this.loading = false;
    }
  }
}
