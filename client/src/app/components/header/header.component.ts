import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../services/fetch-products.service';
import { AuthService } from '../../services/auth.service';

import * as $ from 'jquery';
import { UpdateHeaderService } from 'src/app/services/update-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn;
  user;
  promiseForCategories: Promise<boolean>;
  categories;

  cartItems = [];
  quantityItems = 0;
  totalPrice = 0;

  constructor(
    private fetchProducts: FetchProductsService,
    private authService: AuthService,
    private updateHeader: UpdateHeaderService,
    private changeParam: UpdateHeaderService
  ) {}
  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);
    this.updateHeader.getUpdateHeader().subscribe(() => {
      this.userStatus();
      this.setUser();
    });
    this.userStatus();
    this.setUser();
    this.showCategories();
    this.onUpdateCart();
    this.changeParam.getUpdateDataCart().subscribe(() => {
      this.onUpdateCart();
    });
  }

  onUpdateCart() {
    var a = JSON.parse(localStorage.getItem('userCart'));
    if (a) {
      this.totalPrice = 0;
      this.quantityItems = 0;
      this.cartItems = a;
      console.log(this.cartItems);
      this.cartItems.forEach((el) => {
        this.totalPrice += +(el.price * el.quantity);
        this.quantityItems += +el.quantity;
      });
    }
  }
  // onChangeParams(id) {
  //   this.changeParam.emitParamChangeEvent(id);
  // }

  showCategories() {
    this.fetchProducts.getRootCategories().subscribe((data: any) => {
      this.categories = data.data.categories;
      this.promiseForCategories = Promise.resolve(true);

      // setTimeout(() => {
      this.hierarchicalList();
      // }, 10);
    });
  }

  hierarchicalList() {
    // $('ul.list > li > ul').hide();

    $(document).ready(function () {
      $('.list > li ').hover(function () {
        $(this).children('ul').toggle();
        $(this).siblings('li').children('ul').hide();
      });
    });
  }

  logout() {
    this.authService.logout().subscribe((data) => {
      this.userStatus();
      localStorage.setItem('user-toolsShop', '');
    });
    this.setUser();
  }
  userStatus() {
    this.authService.userStatus().subscribe((data: any) => {
      if (data.isLoggedIn) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }

      console.log(this.isLoggedIn);
    });
  }
  setUser() {
    this.user = localStorage.getItem('user-toolsShop')
      ? JSON.parse(localStorage.getItem('user-toolsShop'))
      : '';
  }
}
