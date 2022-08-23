import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  public currentUser
  public currentDate = new Date();
  public experience
  public profilePicUrl
  public auth
  // public storage = getStorage();


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
      this.calculateExperience(this.currentDate, new Date(this.currentUser.joiningDate))
      // this.getProfilePic(this.currentUser.profilePic)

    } else {
      this.router.navigateByUrl('login')
    }
  }


  goBack() {
    this.router.navigateByUrl('')
  }

  calculateExperience(date1, date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;
    var years = date1.getFullYear() - date2.getFullYear()
    var months = date1.getMonth() - date2.getMonth()
    var days = date1.getDate() - date2.getDate()
    // var days = Math.floor(diff/day);
    // var months = Math.floor(days/31);
    // var years = Math.floor(months/12);

    this.experience = years + " years, " + months + " months, " + days + " days"
  }

  // getProfilePic(url){
  //   const profilePicUrl = ref(this.storage, url);
  // }

  // userSignOut() {
  //   signOut(this.auth).then(() => {
  //     this.router.navigateByUrl('splash')
  //   }).catch((error) => {
  //     this.router.navigateByUrl('')
  //   });
  // }

}

