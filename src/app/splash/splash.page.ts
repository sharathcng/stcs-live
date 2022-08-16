import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private database: AngularFireDatabase) { }

  ngOnInit() {
    setTimeout(() => {

      //to check user logged in
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        this.router.navigateByUrl('home-tab')
      } else {
        this.router.navigateByUrl('login')
      }

      //

    }, 3000);
  }


}
