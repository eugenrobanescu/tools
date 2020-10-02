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
  promiseForCategories: Promise<boolean>; // Pentru a nu se incarca template-ul inainte sa ajunga datele din db
  category;

  constructor(
    private fetchProducts: FetchProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);

    // Verifica daca se schimba "params"
    this.route.params.subscribe((params: Params) => {
      this.showCategories(params.id);
    });
  }

  showCategories(category) {
    this.fetchProducts.getCategoryById(category).subscribe((data: any) => {
      this.category = data.data.category;
      this.promiseForCategories = Promise.resolve(true);

      // setTimeout(() => {
      this.hierarchicalList();
      // }, 10);
    });
  }

  // pentru liste
  hierarchicalList() {
    // $('ul.list > li > ul').hide();

    $(document).ready(function () {
      $('.list > li ').click(function () {
        $(this).children('ul').show();
        $(this).siblings('li').children().hide();
      });
    });
  }
}
