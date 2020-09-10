import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  // @Output() featureSelected = new EventEmitter<string>();
  isAuthenticated = false;

  authsub: Subscription;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {

    this.authsub = this.authservice.user.subscribe(user => {
      this.isAuthenticated = !!user;

    });
  }




  Onlogout() {

    this.authservice.logout();
  }

  ngOnDestroy() {
    this.authsub.unsubscribe();
  }


}
