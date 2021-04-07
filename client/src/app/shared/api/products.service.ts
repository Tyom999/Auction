import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProductInterface} from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product;

  constructor(private http: HttpClient) { }
  add(product): Observable<IProductInterface> {
    debugger
    return this.http.post<IProductInterface>('http://localhost:3000/product/add', product);
  }

  getUnfinishedProducts(): Observable<IProductInterface[]> {
    return this.http.get<IProductInterface[]>('http://localhost:3000/product/getUnfinishedProducts');
  }
  getCompletedProducts(): Observable<IProductInterface[]> {
    return this.http.get<IProductInterface[]>('http://localhost:3000/product/getCompletedProducts');
  }
  getOne(id): Observable<IProductInterface> {
    return this.http.get<IProductInterface>(`http://localhost:3000/product/getOneProduct/${id}`);
  }
  sellProduct(product): Observable<IProductInterface> {
    return this.http.put<IProductInterface>(`http://localhost:3000/product/sellProduct/${product._id}`, product);

  }
}
