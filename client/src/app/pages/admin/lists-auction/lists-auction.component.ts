import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../shared/api/products.service';
import {IProductInterface} from '../../../shared/models/product.interface';

@Component({
  selector: 'app-lists-auction',
  templateUrl: './lists-auction.component.html',
  styleUrls: ['./lists-auction.component.css']
})
export class ListsAuctionComponent implements OnInit {
  products: IProductInterface[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getCompletedProducts().subscribe(products => {
      this.products = products;
    });
  }
}
