import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input() schema: any[] = [];
  @Input() formKey: string = '';
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private formState: FormStateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    for (const field of this.schema) {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      this.form.addControl(field.name, this.fb.control('', validators));
    }

    const saved = this.formState.getFormState(this.formKey);
    if (saved) this.form.patchValue(saved);

    this.form.valueChanges.subscribe(value => {
      this.formState.setFormState(this.formKey, value);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 2000 });
      this.formSubmit.emit(this.form.value);
    } else {
      this.snackBar.open('Please fill out required fields.', 'Close', { duration: 2000 });
    }
  }
}