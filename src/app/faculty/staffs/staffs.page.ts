import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.page.html',
  styleUrls: ['./staffs.page.scss'],
})
export class StaffsPage implements OnInit {
  private staffList = {}

  constructor(private database: AngularFireDatabase) { }

  ngOnInit() {
    this.getTeachersObjects()
  }

  getTeachersObjects() {

    const db = getDatabase();
    const starCountRef = ref(db, 'staffs');
    onValue(starCountRef, (snapshot) => {
      this.staffList = snapshot.val();
      console.log(this.staffList)
    });
  }

}
