import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { UpdateHeaderService } from 'src/app/services/update-header.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginMode = true;
  constructor(
    private router: Router,
    private authService: AuthService,
    private updateHeader: UpdateHeaderService
  ) {}

  ngOnInit(): void {}

  changeLoginMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form) {
    const userData: any = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    if (this.loginMode) {
      this.authService.login(userData).subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('user-toolsShop', JSON.stringify(data.data.user));
        this.updateHeader.emitUpdateHeader();
        this.router.navigate(['/home']);
      });
    } else {
      userData.passwordConfirm = form.value.passwordConfirm;

      this.authService.signup(userData).subscribe((data: any) => {
        this.router.navigate(['/home']);
        localStorage.setItem('user-toolsShop', JSON.stringify(data.data.user));
        this.updateHeader.emitUpdateHeader();
      });
    }
  }
}
