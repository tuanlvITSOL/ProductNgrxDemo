import { Component, OnInit } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { User } from '../resources/auth';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private route: Router,
    private cartService: MockApiCartService,
    private store: Store<AppState>
  ) {}

  user: User;

  ngOnInit(): void {}

  updateShoppingCart(userid) {
    const observer = {
      next: (cartlist) => {
        this.cartService.updatedCartSelection(cartlist);
      },
      error: (err) => console.error(err),
    };
    this.cartService.getCartByUserId(userid).subscribe(observer);
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(
      fromAuthActions.loginPage({
        username: f.value.username,
        password: f.value.password
      })
    );
  }
}
