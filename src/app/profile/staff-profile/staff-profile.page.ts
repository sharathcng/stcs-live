import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.page.html',
  styleUrls: ['./staff-profile.page.scss'],
})
export class StaffProfilePage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private database: AngularFireDatabase, private router: Router) { }

  public staffData = {}
  public staffId
  public principal: boolean = false


  ngOnInit(): void {
    const auth = getAuth();

    this.activatedRouter.paramMap.subscribe(params => {
      this.staffId = params.get('id')
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getDatabase();
        const dbRef = ref(db)

        onValue(ref(db, 'teachers/' + user.uid), (snapshot) => {
          this.principal = true
          if (this.principal) {
            const batchRef = ref(db, 'staffs/' + this.staffId)

            onValue(batchRef, (snapshot) => {
              this.staffData = snapshot.val();
            });

            console.log(this.staffData)

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