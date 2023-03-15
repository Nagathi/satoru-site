import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  img: string = 'assets/satoru-backg.jpeg'
  userForm!: FormGroup

  ngOnInit(): void{
    this.userForm = new FormGroup({
      
      id: new FormControl(''),
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      tipo: new FormControl('')

    });

  }

  
  get user(){
    return this.userForm.get('user')!
  }
  get pass(){
    return this.userForm.get('pass')!
  }
  get email(){
    return this.userForm.get('email')!
  }
  get name(){
    return this.userForm.get('name')!
  }

  submit(){
    console.log(this.userForm)
  }


}
