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

  constructor(
    private fetchProducts: FetchProductsService,
    private authService: AuthService,
    private updateHeader: UpdateHeaderService
  ) {}
  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);
    this.updateHeader.getUpdateHeader().subscribe(() => {
      console.log('yes sir');
      this.userStatus();
      this.setUser();
    });
    this.userStatus();
    this.setUser();
    this.showCategories();
  }

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
