import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {AdminGuard} from './shared/guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'add-auction',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./pages/admin/add-auction/add-auction.module').then(m => m.AddAuctionModule)
  },
  {
    path: 'lists-auction',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./pages/admin/lists-auction/lists-auction.module').then(m => m.ListsAuctionModule)
  },
  {
    path: 'detail-auction/:id',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./pages/admin/detail-auction/detail-auction.module').then(m => m.DetailAuctionModule)
  },
  {
    path: 'auctions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/auctions/auctions.module').then(m => m.AuctionsModule)},
  {
    path: 'participate/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/participate-auction/participate-auction.module').then(m => m.ParticipateAuctionModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
