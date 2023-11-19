import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import { SnackbarService } from '../snack-bar/snackbar.service';
import { SnakbarModel } from '../../models/snak-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate, OnDestroy {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();
  private loginSub!: Subscription;

  constructor(
    private logger: LoggerService,
    private snackBar: SnackbarService,
    private router: Router
  ) { }

  public init() {
    this.logger.debug('init AuthService');
  }

  public login() {
    this.logger.info('login');
    this.isLoggedIn.next(true);
  }

  public logout() {
    this.logger.info('logout');
    this.isLoggedIn.next(false);
  }

  // pages can be accessed if the user is logged in. Otherwise display a message
  canActivate(): Observable<boolean> {
    this.loginSub = this.isLoggedIn$.subscribe((isLogged) => {
      if (!isLogged) {
        const snackMessage: SnakbarModel = {
          message: 'please Log In',
          type: 'info',
        };
        this.snackBar.append(snackMessage);
        this.router.navigate(['/home']);
      }
    });

    this.loginSub.unsubscribe();
    return this.isLoggedIn$;
  }

  ngOnDestroy() {
    if (this.loginSub) { this.loginSub.unsubscribe(); }
  }
}
