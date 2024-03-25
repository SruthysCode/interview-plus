import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formBuilder: any;

  constructor(private http: HttpClient,
     private formbuilder: FormBuilder,
     private router : Router,
     ) {}
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: ['', [Validators.required]],
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

  register() {
    if (this.form.valid) {
      let signupDetails = this.form.getRawValue();

      if (
        signupDetails.name === '' ||
        signupDetails.email === '' ||
        signupDetails.password === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        signupDetails = this.form.getRawValue();
        this.http
          .post<any>('http://localhost:3000/api/register', signupDetails)
          .subscribe((res: any) => {
            console.log(res);
            if (!res.success) {
              Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: ' Please try again.',
              });
            }
            else
            {
              this.router.navigate(['/login'])
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
