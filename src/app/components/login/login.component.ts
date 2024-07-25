import { Component } from '@angular/core';
import { ZoneInputsComponent } from "../../subComponents/zone-inputs/zone-inputs.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    'user': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  });
  
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
    }
  }

  signUp(){
    this.router.navigateByUrl(this.nextRoute)
  }
}
