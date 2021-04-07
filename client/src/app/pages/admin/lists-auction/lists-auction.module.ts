import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsAuctionRoutingModule } from './lists-auction-routing.module';
import { ListsAuctionComponent } from './lists-auction.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [ListsAuctionComponent],
  imports: [
    CommonModule,
    ListsAuctionRoutingModule,
    SharedModule
  ]
})
export class ListsAuctionModule { }

