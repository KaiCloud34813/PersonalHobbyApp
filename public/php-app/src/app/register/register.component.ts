import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMsg: string = '';
  successMsg: string = '';

  #registrationForm!: FormGroup;
  get registrationForm() {
    return this.#registrationForm;
  }

  constructor(
    private usersService: UsersDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.#registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(registrationForm: FormGroup) {
    let newUser: Register = new Register();
    newUser.fillFromForm(registrationForm);
    this.usersService.registerUser(newUser).subscribe({
      next: () => (this.successMsg = 'User created'),
      error: (err) => console.log('err', err),
      complete: () => this.router.navigate(['']),
    });
  }
  userCreated() {
    this.errorMsg = '';
    this.successMsg = 'Success';
  }
}

export class Register {
  name!: string;
  username!: string;
  password!: string;

  public fillFromForm = (form: FormGroup | NgForm): void => {
    this.name = form.value.name;
    this.username = form.value.username;
    this.password = form.value.password;
  };
}
