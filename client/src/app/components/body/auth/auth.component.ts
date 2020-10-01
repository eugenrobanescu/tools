import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginMode = true;
  constructor(private authService: AuthService) {}

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
        localStorage.setItem('user-barberShop', JSON.stringify(data.data.user));
      });
    } else {
      userData.passwordConfirm = form.value.passwordConfirm;
      console.log(userData);
      this.authService.signup(userData).subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('user-barberShop', JSON.stringify(data.data.user));
      });
    }
  }
}
