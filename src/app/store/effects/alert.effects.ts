import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from 'ngx-alerts';
import * as fromAuthActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AlertEffects {

  checkingYouInformation$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(fromAuthActions.loginPage, fromAuthActions.loginModal),
      tap(() => this.alertService.info('Checking your information'))),
    { dispatch: false }
  );

  welComeBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginSuccess),
        tap((action) =>
        this.alertService.success (
          'welcome Back' + action.user.username + ' !'
        ))
      ),
        {dispatch: false}
  );

  unableTologin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() =>
        this.alertService.danger ('Unable to login !'
        ))
      ),
        {dispatch: false}
  );
  constructor(private actions$: Actions, private alertService: AlertService) {}
}
