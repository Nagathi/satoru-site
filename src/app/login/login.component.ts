import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  img: string = 'assets/satoru-backg.jpeg'

  userForm!: FormGroup

  ngOnInit(): void{
    this.userForm = new FormGroup({
      id: new FormControl(''),
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)

    });
  }

  get user(){
    return this.userForm.get('user')!
  }
  get pass(){
    return this.userForm.get('pass')!
  }

  submit(){
    console.log('CLICOU')
  }

}
