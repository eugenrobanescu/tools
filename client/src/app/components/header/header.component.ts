import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../services/fetch-products.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  promiseForCategories: Promise<boolean>;
  categories;
  categorySelected;
  categoriesDisplayed;

  constructor(private fetchProducts: FetchProductsService) {}
  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);

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
}
