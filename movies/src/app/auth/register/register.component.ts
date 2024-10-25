import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authSvc.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isSuccess = true;
          this.message = 'Registered successfully';
        },
        error: (err) => {
          this.isSuccess = false;
          this.message = err;
        },
      });
    }
  }
}