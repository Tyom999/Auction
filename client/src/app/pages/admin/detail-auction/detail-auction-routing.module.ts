import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailAuctionComponent} from './detail-auction.component';

const routes: Routes = [
  {path: '', component: DetailAuctionComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailAuctionRoutingModule { }
