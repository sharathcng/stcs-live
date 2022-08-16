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

  username:string
  fullname:string
  quotes:Observable<any[]>

  constructor(private database:AngularFireDatabase, private router:Router) { }
  ngOnInit(): void {


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        this.username = user.email


        const db = getDatabase();
    
        onValue(ref(db, '/users/' + uid ), (snapshot) => {
          console.log(snapshot);
          console.log(snapshot.val())
          this.fullname = snapshot.val().firstName + snapshot.val().lastName
          //const username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
          // ...
        })

        this.quotes = this.database.list('/quotes', ref => ref.limitToLast(1)).snapshotChanges()
        console.log(this.quotes)

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  openProfilePage(){
    this.router.navigateByUrl('about')
  }

}
