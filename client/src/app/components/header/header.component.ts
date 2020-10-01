import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../services/fetch-products.service';
import { AuthService } from '../../services/auth.service';

import * as $ from 'jquery';

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

  constructor(
    private fetchProducts: FetchProductsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);
    this.userStatus();
    this.setUser();
    this.showCategories();
  }

  showCategories() {
    this.fetchProducts.getRootCategories().subscribe((data: any) => {
      this.categories = data.data.categories;
      this.promiseForCategories = Promise.resolve(true);
      console.log(this.categories);
      // setTimeout(() => {
      this.hierarchicalList();
      // }, 10);
    });
  }

  hierarchicalList() {
    // $('ul.list > li > ul').hide();
    console.log('ceva');
    $(document).ready(function () {
      $('.list > li ').hover(function () {
        $(this).children('ul').toggle();
        $(this).siblings('li').children('ul').hide();
      });
    });
  }

  logout() {
    this.authService.logout().subscribe((data) => {
      this.isLoggedIn = false;
      localStorage.setItem('user-barberShop', '');
    });
    this.setUser();
  }
  userStatus() {
    this.authService.userStatus().subscribe((data: any) => {
      console.log(data.isLoggedIn);
      if (data.isLoggedIn) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  setUser() {
    this.user = localStorage.getItem('user-barberShop')
      ? JSON.parse(localStorage.getItem('user-barberShop'))
      : '';
  }
}
