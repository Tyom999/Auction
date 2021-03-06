import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/api/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }
}
