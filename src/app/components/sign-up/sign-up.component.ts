import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZoneInputsComponent } from '../../subComponents/zone-inputs/zone-inputs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ZoneInputsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  nextRoute = 'login';
  
  registerForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  });
  
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Formulario enviado', this.registerForm.value);
      this.signUp(); // Navegar a la siguiente ruta
    }
  }

  signUp() {
    this.router.navigateByUrl(this.nextRoute);
  }
}
