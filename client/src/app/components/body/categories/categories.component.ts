import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchProductsService } from '../../../services/fetch-products.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  promiseForCategories: Promise<boolean>;
  category;
  categorySelected;
  categoriesDisplayed;

  constructor(
    private fetchProducts: FetchProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);

    this.route.params.subscribe((params: Params) => {
      this.showCategories(params.id);
      // console.log(params.id);
    });
  }

  showCategories(category) {
    this.fetchProducts.getCategoryById(category).subscribe((data: any) => {
      // if
      console.log(data);
      this.category = data.data.category;
      this.promiseForCategories = Promise.resolve(true);
      console.log(this.category);
      // setTimeout(() => {
      this.hierarchicalList();
      // }, 10);
    });
  }

  hierarchicalList() {
    // $('ul.list > li > ul').hide();
    console.log('ceva');
    $(document).ready(function () {
      $('.list > li ').click(function () {
        $(this).children('ul').show();
        $(this).siblings('li').children().hide();
      });
    });
  }
}
