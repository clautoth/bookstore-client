import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.isLogged = false;
    } 
    else {
      this.isLogged = true;
    }
  }

  onLogout() {
    localStorage.removeItem("token");
    this._router.navigate([""]);
    this.isLogged = false;
  }
}
