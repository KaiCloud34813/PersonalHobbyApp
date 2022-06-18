import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private router: Router,
    private authService: AuthentificationService
  ) {}
  onHome(): void {
    this.router.navigate(['']);
  }
  onBooks(): void {
    this.router.navigate(['books']);
  }
  onRegister(): void {
    this.router.navigate(['register']);
  }

  ngOnInit(): void {}
}
