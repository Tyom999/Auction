import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipateAuctionRoutingModule } from './participate-auction-routing.module';
import { ParticipateAuctionComponent } from './participate-auction.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [ParticipateAuctionComponent],
  imports: [
    CommonModule,
    ParticipateAuctionRoutingModule,
    SharedModule
  ]
})
export class ParticipateAuctionModule { }
