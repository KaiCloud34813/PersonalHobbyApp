import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Register } from '../register/register.component';
import { UsersDataService } from '../users-data.service';

export class LoginToken {
  success: boolean = false;
  token: string = '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  get name() {
    return this._authService.name;
  }

  @ViewChild('loginForm')
  loginForm!: NgForm;

  credentials!: Register;

  done: boolean = false;

  constructor(
    private usersService: UsersDataService,
    private _authService: AuthentificationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.credentials = new Register();
    this.credentials.username = '';
    this.credentials.password = '';
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    if (!this.done) {
      e.preventDefault();
      this.done = true;
    }
  }
  logout() {
    this._authService.deleteToken();
    this._router.navigate(['']);
  }
  login(loginResponse: LoginToken) {
    console.log(loginResponse);
    this._authService.token = loginResponse.token;
    this._router.navigate(['/books']);
  }
  onSubmit(loginForm: NgForm): void {
    let user: Register = new Register();
    user.fillFromForm(loginForm);
    this.usersService.login(user).subscribe({
      next: (loginResponse) => this.login(loginResponse),
      error: (err) => {
        console.log('error', err);
      },
    });
  }
  reset(form: NgForm) {}
}
