import { Component, OnInit } from '@angular/core';
import { FetchProductsService } from '../../services/fetch-products.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor(private fetchProducts: FetchProductsService) {}

  ngOnInit(): void {}
}
