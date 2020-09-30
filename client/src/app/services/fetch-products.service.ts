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
  getCategoryById(id) {
    return this.http.get(`http://localhost:8000/api/categories/${id}`);
  }

  cancelAppointment(id) {
    const canceledModel = {
      createdAt: '',
      haircutName: '',
      phone: '',
      userName: '',
      duration: 0,
    };
    return this.http.patch(
      `http://localhost:8000/api/appointment/${id}`,
      canceledModel
    );
  }
  postAppointment(barber, body) {
    return this.http.post(
      `http://localhost:8000/api/appointment/${barber}`,
      body
    );
  }
}
