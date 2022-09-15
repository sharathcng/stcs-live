import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private database: AngularFireDatabase, private router: Router) { }

  
  public classData = []
  public batchId
  public principal: boolean = false


  ngOnInit(): void {
    const auth = getAuth();

    this.activatedRouter.paramMap.subscribe(params => {
      this.batchId = params.get('id')
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();

        onValue(ref(db, 'teachers/' + user.uid), (snapshot) => {
          this.principal = true
          if (this.principal) {
            const batchRef = ref(db, 'classes/'+this.batchId);
            onValue(batchRef, (snapshot) => {
              this.classData = snapshot.val();
              console.log(this.classData)
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