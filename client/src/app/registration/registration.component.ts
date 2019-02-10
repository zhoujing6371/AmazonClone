import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;

  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService) { }

  ngOnInit() {
  }

  validate() {
    if (this.name) { // if name is empty
      if (this.email) { // if email is empty
        if (this.password) { // if password is empty
          if (this.password1) { // if confirmation password is empty
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error('Password do not match');
            }
          } else {
            this.data.error('Confirmation Password is not entered');
          }
        } else {
          this.data.error('Password is not entered');
        }
      } else {
        this.data.error('Email is not entered');
      }
    } else {
      this.data.error('User name is not entered');
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          'http://localhost:5555/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller
          },
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successful!');
          await this.data.getProfile();
        } else {
          this.data.error(data['message']);
        }
      }

    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
