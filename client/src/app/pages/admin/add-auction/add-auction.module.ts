import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAuctionRoutingModule } from './add-auction-routing.module';
import { AddAuctionComponent } from './add-auction.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [AddAuctionComponent],
  imports: [
    CommonModule,
    AddAuctionRoutingModule,
    SharedModule
  ]
})
export class AddAuctionModule { }
