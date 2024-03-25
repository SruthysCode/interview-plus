import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  login() {
    if (this.form.valid) {
      let loginDetails = this.form.getRawValue();

      if (loginDetails.email === '' || loginDetails.password === '') {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        loginDetails = this.form.getRawValue();
        console.log(loginDetails, 'lo');
        this.http
          .get<any>('http://localhost:3000/api/login', loginDetails)
          .subscribe((res: any) => {
            console.log(res);
            if (!res.success) {
              Swal.fire({
                icon: 'error',
                title: 'Log In Failed',
                text: ' Please try again.',
              });
            } else {
              this.router.navigate(['/home']);
            }
          });
      }
    } else {
      Swal.fire(
        'Form is not valid',
        'Please fill out all required fields',
        'error'
      );
    }
  }
}
