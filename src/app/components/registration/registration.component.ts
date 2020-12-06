import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = new User();
  msg = '';

  constructor(private _service: UserService,
    private _router: Router) { }


  ngOnInit(): void {
  }

  registerUser() {
    this._service.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log("response received");
        this.msg = "Registration successfull";
        this._router.navigate(['/login']);
      },
      error => {
        console.log("exception occured");
        this.msg = error.error;
      }
    )
  }

}
