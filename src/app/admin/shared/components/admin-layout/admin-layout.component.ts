import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

import {  } from "../alert/alert.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService
    ) {

   }

  ngOnInit() {
  }

  logout(event:Event){
    // console.log('logout(event:Event)')
    event.preventDefault();
    this.auth.logout()
    this.router.navigate(['/admin','login'])
  }

}
