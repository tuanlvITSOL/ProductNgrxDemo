import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../resources/auth.service';
import { AlertService } from 'ngx-alerts';
import { MockApiCartService } from '../../cart/resources/mock-api-cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import * as fromAuthSelector from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
})
export class AuthLinksComponent implements OnInit {
 // user: User;
  vm$: Observable<fromAuthSelector.AuthLinksViewModal>;
  modalRef: BsModalRef;

  constructor(
    public authService: AuthService,
    private alertService: AlertService,
    private cartService: MockApiCartService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(fromAuthSelector.selectAuthLinksViewModel));
  }

  logout() {
   this.store.dispatch(fromAuthActions.logout());
  }

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
    fromAuthActions.loginModal({
      username: f.value.username,
      password: f.value.password
    }));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  cancel(): void {
    this.modalRef.hide();
  }
}
