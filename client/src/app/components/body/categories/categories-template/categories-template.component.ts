import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../../../services/share-data.service';

@Component({
  selector: 'app-categories-template',
  templateUrl: './categories-template.component.html',
  styleUrls: ['./categories-template.component.css'],
})
export class CategoriesTemplateComponent implements OnInit {
  categories;
  promiseForCategories = Promise.resolve(false);
  constructor(private data: ShareDataService) {}

  ngOnInit(): void {
    this.promiseForCategories = Promise.resolve(false);
    this.fetchCategories();
  }

  fetchCategories() {
    this.data.currentData.subscribe((categories) => {
      this.categories = categories;

      this.promiseForCategories = Promise.resolve(true);
    });
  }
}
