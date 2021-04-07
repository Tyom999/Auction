import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import {IBidInterface} from '../models/bid.interface';
import {IActiveUsers} from '../models/active-users';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: SocketIOClient.Socket;
  public auctionParticipants: IActiveUsers[] = [];
  public participantUserId: string;
  public userJoin$ = new Subject<string>();
  public userDisconnect$ = new Subject();
  public addProduct$ = new Subject();
  public onBet$ = new Subject();
  public changeUser$ = new Subject();
  public getProduct$ = new Subject();

  constructor() {
    this.socket = io('http://localhost:3000/auction');

    this.socket.on('userJoin', ({userId}) => {
      this.userJoin$.next(userId);
    });

    this.socket.on('userDisconnect', ({userId}) => {
      this.userDisconnect$.next(userId);
    });

    this.socket.on('addProduct', () => {
      this.addProduct$.next();
    });

    this.socket.on('onBet', () => {
      this.onBet$.next();
    });

    this.socket.on('changeUser', () => {
      this.changeUser$.next();
    });

    this.socket.on('getProduct', () => {
      this.getProduct$.next();
    });

  }

  getAllUsers(): any {
    this.socket.on('allUsers', (allUsers) => {
      this.auctionParticipants = allUsers;
      return this.auctionParticipants;
    });
  }

  addProduct(product): any {
    this.socket.emit('addProduct', {product});
  }

  changeUser(product): any {
    this.socket.emit('changeUser', {productId: product._id});
  }

  onBet(product): any {
    this.socket.emit('onBet', {productId: product._id});
  }

  userDisconnect(productId, userId): any {
    this.socket.emit('userDisconnect', {productId, userId});
  }

  getParticipantUser(): any {
    this.socket.on('participantUser', (participantUserId) => {
      this.participantUserId = participantUserId;
      return participantUserId;
    });
  }

  userJoin(productId, userId): void {
    this.socket.emit('userJoin', {productId, userId});
  }

  // getLastBid(): any {
  //   console.log('ssdsadas');
  //   this.socket.on('lastBid', lastBid => {
  //     console.log(this.socket.emit('Bid', lastBid));
  //     return this.socket.emit('Bid', lastBid);
  //   });
  // }

  // EMITTER
  // sendMessage(msg: string): void {
  //   this.socket.emit('message', { message: msg });
  // }

  sendMessage(data: IBidInterface): any {
    this.socket.emit('message', data);
    return this.socket.emit('message2', data);
  }

  // HANDLER
  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }


  // socket;
  // // readonly uri = 'http://localhost:3000/socket.io/auction';
  // constructor() {
  //   this.socket = io('http://localhost:3000/socket.io/auction');
  // }
  // listen(eventName: string): Observable<any> {
  //   return new Observable(subscriber => {
  //     this.socket.on(eventName, (data) => {
  //       subscriber.next(data);
  //     });
  //   });
  // }
  // emit(eventName: string, data: any): void {
  //   this.socket.emit(eventName, data);
  // }

}
