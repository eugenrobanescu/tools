import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { UpdateHeaderService } from '../../../../services/update-header.service';
@Component({
  selector: 'app-products-template',
  templateUrl: './products-template.component.html',
  styleUrls: ['./products-template.component.css'],
})
export class ProductsTemplateComponent implements OnInit {
  products;
  promiseForProducts = Promise.resolve(false);
  constructor(
    private data: ShareDataService,
    private updateHeader: UpdateHeaderService
  ) {}
  ngOnInit(): void {
    this.promiseForProducts = Promise.resolve(false);
    this.fetchProducts();
  }

  fetchProducts() {
    this.data.currentData.subscribe((products) => {
      this.products = products;

      this.promiseForProducts = Promise.resolve(true);
    });
  }

  addToCart(product) {
    console.log(JSON.parse(localStorage.getItem('userCart')));
    // localStorage.setItem('userCart', JSON.stringify(a));
  }
}
