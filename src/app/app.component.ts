import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        /* we need to bind this because the validation function is called by angular no by this class */
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        /* required and email are functions so dont put () or it will be executed */
      }),
      'gender': new FormControl('male'),
      // 'hobbies': new FormArray([new FormControl(null)])
      'hobbies': new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  /* Validator is a function that checks the validity of a formControl*/
  /* This function should return something like this:
   { nameIsForbbiden: true }
  */
  forbiddenNames(control: FormControl): {[s: string]: boolean } {
    /* This validation is returning -1 and -1 is true */
    /* if (this.forbiddenUsernames.indexOf(control.value)) { */
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
    /* If successfull we should return nothing or null never pass { 'nameIsForbidden': false } */
  }
}
