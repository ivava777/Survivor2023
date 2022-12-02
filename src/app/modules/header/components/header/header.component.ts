import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  private unsubscriber = new Subject<boolean>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .currentUserObservable()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((user) => (this.isAuthenticated = !!user));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(false);
    this.unsubscriber.complete();
  }

  public logout() {
    this.authService.signOut().then(() => (this.isAuthenticated = false));
  }

  login() {
    this.router.navigate(['login']);
  }

  openCart() {
    this.router.navigate(['cart']);
  }
}
