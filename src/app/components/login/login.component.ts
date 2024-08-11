import { Component } from '@angular/core';
import { ZoneInputsComponent } from "../../subComponents/zone-inputs/zone-inputs.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ZoneInputsComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  nextRoute = 'sign-up';

  loginForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });
  
  constructor(private formBuilder: FormBuilder, private router: Router, private _userService:UserService) {
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {

      this._userService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.token)
          localStorage.setItem('nameRestaurant', response.company.name)
          localStorage.setItem('name', response.name)
          this.router.navigate(['home']);
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
