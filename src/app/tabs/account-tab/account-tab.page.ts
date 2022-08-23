import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.page.html',
  styleUrls: ['./account-tab.page.scss'],
})
export class AccountTabPage implements OnInit {

  public currentUser
  public profilePicUrl
  public auth

  constructor(private router: Router, private database: AngularFireDatabase) { }

  ngOnInit() {

    this.auth = getAuth();

    const user = this.auth.currentUser;
    const userId = this.auth.currentUser.uid;

    if (user) {

      const db = getDatabase();
      onValue(ref(db, '/users/' + userId), (snapshot) => {
        this.currentUser = (snapshot.val() || 'Anonymous')
      })
      
    } else {
      this.router.navigateByUrl('login')
    }
  }

  goBack() {
    this.router.navigateByUrl('')
  }

  userSignOut() {
    signOut(this.auth).then(() => {
      this.router.navigateByUrl('splash')
    }).catch((error) => {
      this.router.navigateByUrl('')
    });
  }
}
