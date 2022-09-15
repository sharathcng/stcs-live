import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private database: AngularFireDatabase, private router: Router) { }

  public teacherData = {}
  public teacherId
  public principal: boolean = false


  ngOnInit(): void {
    const auth = getAuth();

    this.activatedRouter.paramMap.subscribe(params => {
      this.teacherId = params.get('id')
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        const dbRef = ref(db)

        onValue(ref(db, 'teachers/' + user.uid), (snapshot) => {
          this.principal = true
          if (this.principal) {
            const batchRef = ref(db, 'teachers/' + this.teacherId)

            onValue(batchRef, (snapshot) => {
              this.teacherData = snapshot.val();
            });

            console.log(this.teacherData)

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