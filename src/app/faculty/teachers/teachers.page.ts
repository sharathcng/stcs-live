import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, onValue } from "firebase/database";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {

  private teachersList = {}

  constructor(private database: AngularFireDatabase) { }

  ngOnInit() {
    this.getTeachersObjects()
  }

  getTeachersObjects() {

    const db = getDatabase();
    const starCountRef = ref(db, 'teachers');
    onValue(starCountRef, (snapshot) => {
      this.teachersList = snapshot.val();
      console.log(this.teachersList)
    });
  }

}
