import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';
import { UpdateHeaderService } from '../../../../services/update-header.service';

import * as $ from 'jquery';
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
    private changeParam: UpdateHeaderService
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
    // +$(event.target).parent().parent().find('input').val(),
    const item = {
      itemName: product.name,
      price: product.price,
      quantity: 1,
      _id: product._id,
    };
    console.log(product);
    var newCart = [];
    var oldCart = JSON.parse(localStorage.getItem('userCart'));
    var verifyCart;
    var exists;
    if (oldCart && oldCart.length > 0) {
      verifyCart = oldCart.map((el) => {
        if (el.itemName == item.itemName) {
          el.quantity = el.quantity + item.quantity;
        }
        return el;
      });
      for (let el of oldCart) {
        if (el.itemName == item.itemName) {
          exists = true;
          break;
        } else {
          exists = false;
        }
      }

      if (exists) {
        newCart.push(...verifyCart);
      } else {
        newCart.push(...verifyCart);
        newCart.push(item);
      }
    } else {
      newCart.push(item);
    }

    localStorage.setItem('userCart', JSON.stringify(newCart));
    this.changeParam.cartChange.emit();
  }
}
