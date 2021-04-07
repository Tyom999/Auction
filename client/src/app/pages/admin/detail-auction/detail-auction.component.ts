import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductsService} from '../../../shared/api/products.service';
import {IProductInterface} from '../../../shared/models/product.interface';

@Component({
  selector: 'app-detail-auction',
  templateUrl: './detail-auction.component.html',
  styleUrls: ['./detail-auction.component.css']
})
export class DetailAuctionComponent implements OnInit {
  product: IProductInterface;
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.productsService.getOne(params['id']).subscribe((product) => {
          this.product = product;
        });
      }
    });
  }

}
