import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { child, get, getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private database: AngularFireDatabase, private router: Router, private loadingCtrl: LoadingController) { }

  private studentIds = {}
  private studentsObjects = {}
  private classId = ''
  private year = ''
  private classDetails = {}
  private isPrincipal: boolean = false
  private db = getDatabase();

  ngOnInit(): void {
    this.getUrlParams()
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(this.db, 'teachers/' + user.uid), (snapshot) => {
          this.isPrincipal = snapshot.val().is_principal
          if (this.isPrincipal) {
            this.getClassDetails()
            this.getStudentIds()
          }
        })
      }
      else {
        this.router.navigateByUrl('login')
      }
    })
  }

  //get url parameters
  getUrlParams() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.classId = params.get('id')
      this.year = params.get('year')
    })
  }


  //fetching students IDs present in this class
  private getStudentIds() {
    const batchRef = ref(this.db, 'classStudents/' + this.classId)
    onValue(batchRef, (snapshot) => {
      this.studentIds = snapshot.val()
      Object.entries(this.studentIds).forEach(
        ([key, value]) => {
          onValue(ref(this.db, 'students/' + key), (snapshot1) => {
            this.studentsObjects[snapshot1.key] = snapshot1.val()
          });
        }
      )
    })
  }


  //getting class details
  private getClassDetails() {
    const dbRef = ref(getDatabase())
    get(child(dbRef, `classes/${this.year}/${this.classId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.classDetails = snapshot.val()
      } else {
        this.classDetails = null
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  // Loading method, need to call wherever needed
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 2000,
      spinner: 'circles',
    });

    loading.present();
  }

}