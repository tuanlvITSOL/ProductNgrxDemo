import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthLinksViewModal {
  isAdmin: boolean;
  isLoggedin: boolean;
}

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user.id != null
);
export const selectIsLAdmin = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.user.isadmin
);

export const selectAuthLinksViewModel = createSelector(
  selectIsLAdmin,
  selectIsLoggedIn,
  (isAdmin: boolean, isLoggedIn: boolean): AuthLinksViewModal => {
    return {
      isAdmin: isAdmin,
      isLoggedin: isLoggedIn
    };
  }
);
