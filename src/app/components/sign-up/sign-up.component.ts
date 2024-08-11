import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ZoneInputsComponent } from '../../subComponents/zone-inputs/zone-inputs.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ZoneInputsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private role = 'Waiter';
  nextRoute = 'login';

  registerForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
    'username': new FormControl('', Validators.required),
    'codeCompany': new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  showAlert(): void {
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully signed up!',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.get('name')?.value,
        codeCompany: this.registerForm.get('codeCompany')?.value,
        password: this.registerForm.get('password')?.value,
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        role: this.role,
      };

      this._userService.register(user).subscribe(
        response => {
          this.router.navigate([this.nextRoute]);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
    }
  }

  signUp(){
    this.router.navigateByUrl(this.nextRoute)    
  }
}
