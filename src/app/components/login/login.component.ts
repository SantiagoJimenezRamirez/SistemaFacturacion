import { Component } from '@angular/core';
import { ZoneInputsComponent } from "../../subComponents/zone-inputs/zone-inputs.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ZoneInputsComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  nextRoute = 'home';

  loginForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });
  
  constructor(private formBuilder: FormBuilder, private router: Router, private _userService:UserService) {
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this._userService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          localStorage.setItem('token', response.token)
          this.router.navigate([this.nextRoute]);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }

  signUp(){
    this.router.navigateByUrl(this.nextRoute)
  }
}
