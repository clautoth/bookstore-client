import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  msg = '';

  constructor(private _service: UserService,
    private _router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null)
      this._router.navigateByUrl("/home");
  }

  loginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (res: any) => {
        console.log(res.accessToken);
        localStorage.setItem("token", res.accessToken);
        console.log("response received");
        this._router.navigate(['/home']);
      },
      (err) => {
        console.log("exception occured");
        this.msg = "Bad credidentails, please enter valid values.";
      }
    )
  }
}
