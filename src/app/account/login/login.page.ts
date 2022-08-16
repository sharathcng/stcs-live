import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup
  constructor(private database:AngularFireDatabase,private router: Router, public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  login(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.value.email, this.loginForm.value.password)
      .then((userCredential) => { 
        const user = userCredential.user;
        this.router.navigateByUrl('home-tab')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.router.navigateByUrl('login')
        // ...
      });
  }
}
