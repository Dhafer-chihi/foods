import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGE: any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minlength: 'Feild is too short',
  notMatch: 'Password and confirm does not match'
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  @Input() errorMessages: string[] = [];


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
  }
  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }
    const errorkeys = Object.keys(errors);
    this.errorMessages = errorkeys.map(key => VALIDATORS_MESSAGE[key]);
  }

}
