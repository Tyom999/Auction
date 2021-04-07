import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionsRoutingModule } from './auctions-routing.module';
import { AuctionsComponent } from './auctions.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [AuctionsComponent],
  imports: [
    CommonModule,
    AuctionsRoutingModule,
    SharedModule
  ]
})
export class AuctionsModule { }
