import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  user={
    name:"anthony",
    education:"MA",
    expirience:"8",
    bloodGrp:"B+",
    subject:"Maths",
    classInCharge:"9",
    phNum:"9538104857"
  }
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goBack()
  {
    this.router.navigateByUrl('')
  }
}
