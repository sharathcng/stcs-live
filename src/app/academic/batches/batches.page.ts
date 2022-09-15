import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as firebase from 'firebase/database';
import { child, get, getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.page.html',
  styleUrls: ['./batches.page.scss'],
})
export class BatchesPage implements OnInit {

  public batchData = []
  public principal: boolean = false

  constructor(private database: AngularFireDatabase, private router: Router) { }
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();

        onValue(ref(db, 'teachers/' + user.uid), (snapshot) => {
          this.principal = true
          if (this.principal) {
            const batchRef = ref(db, 'batches/');
            onValue(batchRef, (snapshot) => {
              this.batchData = snapshot.val();
            });
          }
        })
      }
      else {
        this.router.navigateByUrl('login')
      }
    })
  }
}