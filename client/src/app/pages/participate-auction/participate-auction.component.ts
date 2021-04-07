import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketioService} from '../../shared/api/socketio.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductsService} from '../../shared/api/products.service';
import {IProductInterface} from '../../shared/models/product.interface';
import {AuthService} from '../../shared/api/auth.service';
import {IBidInterface} from '../../shared/models/bid.interface';
import {IActiveUsers} from '../../shared/models/active-users';

@Component({
  selector: 'app-participate-auction',
  templateUrl: './participate-auction.component.html',
  styleUrls: ['./participate-auction.component.css']
})
export class ParticipateAuctionComponent implements OnInit, OnDestroy {
  cost = '';
  product: IProductInterface;
  userId: string;
  date;
  countDownDate;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timeLeft;
  auctionParticipants: IActiveUsers[];
  started = false;
  closed = false;
  firstSub;
  secondSub;
  now = 0;
  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    public socketIoService: SocketioService) {

  }

  isBtnValid = false;

  ngOnInit(): void {
    this.userId = this.authService.getId();
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.id = params.id;
        this.getProduct(this.id);

        this.socketIoService.getProduct$.subscribe(() => {
          this.getProduct(this.id);
        });

        this.socketIoService.changeUser$.subscribe(() => {
          this.socketIoService.changeUser(this.product);
        });

        this.socketIoService.onBet$.subscribe(() => {
          this.socketIoService.onBet(this.product);
        });
        // this.firstSub = this.productsService.getOne(params['id']).subscribe((product) => {
        //   product.userId = this.userId;
        //   this.socketIoService.joinRoom(product);
        //   // console.log(this.socketIoService.getAllUsers());
        //   this.socketIoService.getAllUsers();
        //   this.auctionParticipants = this.socketIoService.auctionParticipants;
        //   // this.socketIoService.getAllUsers();
        //   this.product = product;
        //   this.auctionStartTimer(product.date);
        //   console.log(this.socketIoService.auctionParticipants);
        //   // this.socketIoService.getAllUsers().subscribe(allUsers => {
        //   //   console.log('ssss');
        //   //   this.auctionParticipants = allUsers;
        //   //   console.log(this.auctionParticipants);
        //   // });
        // });
      }
    });
  }

  getProduct(id: string): void {
    this.productsService.getOne(id).subscribe((data) => {
      this.product = data;
    });
  }

  auctionStartTimer(date): void {
    // const firstInterval = setInterval(() => {
    //   this.countDownDate = new Date(date).getTime();
    //   const now = new Date().getTime();
    //   this.timeLeft = this.countDownDate - now;
    //
    //   this.days = Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
    //   this.hours = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   this.minutes = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    //   this.seconds = Math.floor((this.timeLeft % (1000 * 60)) / 1000);
    //
    //   if (this.timeLeft < 0) {
    //     clearInterval(firstInterval);
    //     this.days = 0;
    //     this.hours = 0;
    //     this.minutes = 0;
    //     this.seconds = 0;
    //     this.started = true;
    //     this.isBtnValid = true;
    //     this.foo();
    //   }
    // }, 1000);
  }

  participantUserInterval(): void {
    const thirdInterval = setInterval(() => {
      this.socketIoService.getParticipantUser();
      if (this.socketIoService.participantUserId === this.userId) {
        this.timer();
        clearInterval(thirdInterval);
      }
    }, 1000);
  }

  timer(): void {

    const secondInterval = setInterval(() => {
      const countSecond = 30;
      this.now++;
      this.seconds = countSecond - this.now;
      if (countSecond - this.now < 0) {
        clearInterval(secondInterval);
        this.isBtnValid = false;
        this.seconds = 0;
        this.closed = true;
        this.secondSub = this.productsService.sellProduct(this.product).subscribe(data => {
          this.router.navigate(['auctions']);
        });
      }
    }, 1000);
  }

  foo(): void {
    console.log('foo');
    console.log(this.socketIoService.getParticipantUser());
    console.log(this.socketIoService.participantUserId);
    if (this.socketIoService.participantUserId === this.userId) {
      this.timer();
    } else if (this.socketIoService.participantUserId !== undefined && this.socketIoService.participantUserId !== this.userId) {
      this.participantUserInterval();
    }
  }


  submit(): void {
    const obj: IBidInterface = {
      productId: this.product._id,
      userId: this.userId,
      cost: this.cost
    };
    this.socketIoService.sendMessage(obj);
    this.cost = '';
    this.isBtnValid = false;
  }

  ngOnDestroy(): void {
    this.now = 31;
    if (this.firstSub) {
      this.firstSub.unsubscribe();
    }
    if (this.secondSub) {
      this.secondSub.unsubscribe();
    }

    this.socketIoService.userDisconnect(this.product._id, this.authService.userId);
  }
}
