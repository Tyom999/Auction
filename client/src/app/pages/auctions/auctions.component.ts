import {Component, OnInit} from '@angular/core';
import {IProductInterface} from '../../shared/models/product.interface';
import {ProductsService} from '../../shared/api/products.service';
import {SocketioService} from "../../shared/api/socketio.service";
import {AuthService} from "../../shared/api/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {
  products: IProductInterface[] = [];

  constructor(
    private productsService: ProductsService,
    private socketioService: SocketioService,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.getList();
    this.socketioService.addProduct$.subscribe((data) => {
      this.getList();
    });
  }


  joinToRoom(product): void {
    this.productsService.product = product;
    this.socketioService.userJoin(product._id, this.authService.userId);
    this.router.navigate(['', 'participate', product._id]);
  }

  getList(): void {
    this.productsService.getUnfinishedProducts().subscribe((products: IProductInterface[]) => {
      this.products = products.reverse();
    });
  }
}
