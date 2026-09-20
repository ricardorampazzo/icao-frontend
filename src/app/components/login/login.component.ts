import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = false;
  errorMessage = '';
  hidePassword = true;
  mode: 'login' | 'register' = 'login';

  form = this.fb.nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor() {
    if (this.route.snapshot.queryParamMap.get('mode') === 'register') {
      this.switchMode('register');
    }
  }

  switchMode(mode: 'login' | 'register'): void {
    if (this.loading || this.mode === mode) {
      return;
    }

    this.mode = mode;
    this.errorMessage = '';

    const nameControl = this.form.controls.name;
    if (mode === 'register') {
      nameControl.setValidators([Validators.required, Validators.minLength(2)]);
      this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      nameControl.clearValidators();
      this.form.controls.password.setValidators([Validators.required]);
    }
    nameControl.updateValueAndValidity();
    this.form.controls.password.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { name, email, password } = this.form.getRawValue();
    const request =
      this.mode === 'register'
        ? this.auth.register({ name, email, password })
        : this.auth.login({ email, password });

    request.subscribe({
      next: () => this.router.navigate(['/courses']),
      error: () => {
        this.errorMessage =
          this.mode === 'register'
            ? 'Nao foi possivel criar sua conta. Verifique os dados informados.'
            : 'E-mail ou senha incorretos.';
        this.loading = false;
      },
    });
  }

  enterDemo(): void {
    this.auth.setToken('DEMO-TOKEN');
    this.router.navigate(['/courses']);
  }
}
