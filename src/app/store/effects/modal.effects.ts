import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ModalService } from 'src/app/modules/auth/resources/modal.service';
import * as fromAuthActions from '../actions/auth.actions';

@Injectable()
export class ModalEffects {

hideModal$ = createEffect(() => {
  return this.actions$.pipe(
      ofType(fromAuthActions.loginSuccess),
      tap(() => this.modalService.hide())
  );
}, {dispatch: false});
  constructor(private actions$: Actions, private modalService: ModalService) {}
}
