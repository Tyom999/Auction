import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddAuctionComponent} from './add-auction.component';

const routes: Routes = [
  {path: '', component: AddAuctionComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAuctionRoutingModule { }
