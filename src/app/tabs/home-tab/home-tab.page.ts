import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  username: string
  fullname: string
  profilePicUrl: string
  quotes: Observable<any[]>
  public auth = getAuth();

  constructor(private database: AngularFireDatabase, private router: Router) { }
  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.username = user.email
        const db = getDatabase();

        onValue(ref(db, '/users/' + uid), (snapshot) => {
          this.fullname = snapshot.val().firstName + snapshot.val().lastName
          this.profilePicUrl = snapshot.val().profilePic
        })
        this.quotes = this.database.list('/quotes', ref => ref.limitToLast(1)).snapshotChanges()
      } else {
        this.router.navigateByUrl('login')
      }
    });
  }

  openProfilePage() {
    this.router.navigateByUrl('about')
  }

}
