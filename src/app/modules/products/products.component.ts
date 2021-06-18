import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from './resources/mock-product-api.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth/resources/auth.service';
import { User } from '../auth/resources/auth';
import * as fromProductModels from '../products/resources/product';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { Pagination } from 'src/app/shared/models/pagination';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import * as fromProductAction from './state/product.actions';
import * as fromProductSelector from './state/product.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: fromProductModels.Product[] = [];
  pagination: Pagination;
  user: User;
  vm$: Observable<fromProductSelector.ProductsViewModel>

  constructor(
    private productService: MockProductApiService,
    public router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private paginationService: PaginationService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.vm$ = this.store.pipe(select(fromProductSelector.selectProductsViewModel));
    this.loadProducts(
      this.paginationService.createUrl(
                '0',
        '999',
        '1',
        '9',
        environment.baseUrl + 'products?'
      ));
  }

  loadProducts(url: string) {
        this.store.dispatch(fromProductAction.loadProducts({
      url: url
      }));
    // this.spinner.show();
    // const productsObserver = {
    //   next: (response) => {
    //     this.products = response.result;
    //     this.pagination = response.pagination;
    //     setTimeout(() => {
    //       this.spinner.hide();
    //     }, 1000);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.alertService.danger('Unable to load products');
    //     this.spinner.hide();
    //   },
    // };

    // this.productService.getProducts(url).subscribe(productsObserver);
  }

  onPriceFilterChange(item: fromProductModels.PriceFilter) {
    this.loadProducts(
      this.paginationService.createUrl(
        item.min,
        item.max,
        '1',
        '25',
        environment.baseUrl + 'products?'
      )
    );
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
