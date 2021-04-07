import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParticipateAuctionComponent} from './participate-auction.component';

const routes: Routes = [
  {path: '', component: ParticipateAuctionComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipateAuctionRoutingModule { }
