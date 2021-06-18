import { Component, OnInit } from '@angular/core';
import { MockProductApiService } from '../resources/mock-product-api.service';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fromProductModels from '../resources/product';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import * as fromProductAction from '../state/product.actions';
import * as fromProductSelector from '../state/product.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: MockProductApiService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private paginationService: PaginationService,
    private store: Store<AppState>
  ) { }

  products: fromProductModels.Product[] = [];
  pagination: fromProductModels.Pagination;
  currentUrl: string;
  vm$: Observable<fromProductSelector.ProductsViewModel>

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(fromProductSelector.selectProductsViewModel));
    this.loadProducts(
      this.paginationService.createUrl(
        '0',
        '999',
        '1',
        '25',
        environment.baseUrl + 'products?'
      ));


  }

  loadProducts(url: string) {
    this.store.dispatch(fromProductAction.loadAdminProducts({
      url: url
    }))
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        this.loadProducts(this.currentUrl);
        this.alertService.success('Product Deleted');
      },
      error: (err) => {
        console.error(err);
        this.alertService.danger('Unable To Delete Product');
      },
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }

  onPaginationChange(url: string) {
    this.loadProducts(url);
  }
}
