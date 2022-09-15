import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private database: AngularFireDatabase, private router: Router) { }

  public studentData = {}
  public studentId
  public principal: boolean = false


  ngOnInit(): void {
    const auth = getAuth();

    this.activatedRouter.paramMap.subscribe(params => {
      this.studentId = params.get('id')
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        const dbRef = ref(db)

        onValue(ref(db, 'teachers/' + user.uid), (snapshot) => {
          this.principal = true
          if (this.principal) {
            const batchRef = ref(db, 'students/' + this.studentId)

            onValue(batchRef, (snapshot) => {
              this.studentData = snapshot.val();
            });

            console.log(this.studentData)

          }
        })
      }
      else {
        this.router.navigateByUrl('login')
      }
    })
  }


  goBack() {
    this.router.navigateByUrl('')
  }
  
}