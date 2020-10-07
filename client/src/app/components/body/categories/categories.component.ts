import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchProductsService } from '../../../services/fetch-products.service';
import { ShareDataService } from '../../../services/share-data.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  promiseForCategories: Promise<any> = Promise.resolve(false); // Pentru a nu se incarca template-ul inainte sa ajunga datele din db
  thereAreCategories: Boolean = true;
  categoriesChildren;
  productsChildren;
  category;

  constructor(
    private data: ShareDataService,
    private fetchProducts: FetchProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Verifica daca se schimba "params"

    this.route.params.subscribe((params: Params) => {
      this.showCategories(params.slug);
    });
  }

  showCategories(category) {
    this.fetchProducts.getCategoryBySlug(category).subscribe((data: any) => {
      this.category = data.data.category[0];
      console.log(this.category);
      this.promiseForCategories = Promise.resolve(true);

      if (this.category.type == 'parent') {
        this.fetchProducts
          .getParentBySlug(this.category.slug)
          .subscribe((data: any) => {
            this.productsChildren = data.data.category[0].children;
            this.data.sendCategories(this.productsChildren);
            this.thereAreCategories = false;
          });
      } else {
        this.categoriesChildren = this.category.children;
        this.data.sendCategories(this.categoriesChildren);
        this.thereAreCategories = true;
      }

      // this.hierarchicalList();
    });
  }

  // pentru liste
  // hierarchicalList() {
  //   // $('ul.list > li > ul').hide();

  //   $(document).ready(function () {
  //     $('.list > li ').click(function () {
  //       $(this).children('ul').show();
  //       $(this).siblings('li').children().hide();
  //     });
  //   });
  // }
}
