import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../../shared/api/products.service';
import {Router} from '@angular/router';
import {SocketioService} from "../../../shared/api/socketio.service";
import {AuthService} from "../../../shared/api/auth.service";

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent implements OnInit {
  form: FormGroup;
  dateNow;
  constructor(private authService: AuthService, private productsService: ProductsService, private router: Router, private socketioService: SocketioService) { }

  ngOnInit(): void {
    this.dateNow =  Date.now();
    this.form = new FormGroup({
      mark: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      startBid: new FormControl(0, [Validators.required]),
    });
  }

  submit(): void {
    this.productsService.add({...this.form.value, userId: this.authService.userId}).subscribe(product => {
      this.socketioService.addProduct(product);
      this.router.navigate(['/lists-auction']);
    });
  }
}
