import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { DialogsService } from './../../../../services/dialogs.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private dialogs: DialogsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async login() {
    this.dialogs.startLoading();
    const response = await this.authService.login(this.form.getRawValue());
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.router.navigate(['']);
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
