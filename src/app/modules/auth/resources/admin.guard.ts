import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectIsLAdmin } from 'src/app/store/selectors/auth.selectors';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  isAdmin: boolean;
  canActivate(): boolean {
this.store.pipe(select(selectIsLAdmin)).subscribe((bool) => {
      this.isAdmin = bool;
      if (!this.isAdmin) {
        this.router.navigate(['/home']);
      }
    });

    return this.isAdmin;
  }
}
