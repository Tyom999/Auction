import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/api/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = false;
  form: FormGroup;

  constructor(private service: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    if (this.isLogin) {
      this.service.signUp(this.form.value).subscribe((user) => {
        this.change();
      });
    } else {
      this.service.signIn(this.form.value).subscribe((user) => {
        if (this.service.isAdmin()) {
          this.router.navigate(['', 'lists-auction']);
        } else {
          this.router.navigate(['', 'auctions']);
        }
      });
    }
  }

  change(): void {
    this.isLogin = !this.isLogin;
    this.form.reset();
  }
}
