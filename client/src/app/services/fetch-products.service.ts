import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchProductsService {
  constructor(private http: HttpClient) {}

  getRootCategories() {
    return this.http.get(`http://localhost:8000/api/categories/rootCategories`);
  }
  getCategoryBySlug(slug) {
    return this.http.get(
      `http://localhost:8000/api/categories/categoriesBySlug/${slug}`
    );
  }
  getParentBySlug(slug) {
    return this.http.get(
      `http://localhost:8000/api/categories/parentCategories/${slug}`
    );
  }
}
