import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailAuctionRoutingModule } from './detail-auction-routing.module';
import { DetailAuctionComponent } from './detail-auction.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [DetailAuctionComponent],
  imports: [
    CommonModule,
    DetailAuctionRoutingModule,
    SharedModule
  ]
})
export class DetailAuctionModule { }
