import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectIsLAdmin, selectIsLoggedIn } from './auth.selectors';

export interface HeaderViewModel {
    isAdmin: boolean;
    isLoggedin: boolean;
}

export const selectHeaderViewModel = createSelector(
  selectIsLAdmin,
  selectIsLoggedIn,
  (isAdmin: boolean, isLoggedIn: boolean): HeaderViewModel => {
    return {
      isAdmin: isAdmin,
      isLoggedin: isLoggedIn
    };
  }
);