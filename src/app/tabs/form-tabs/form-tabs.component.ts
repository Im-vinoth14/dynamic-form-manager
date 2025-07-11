import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormStateService } from '../../services/form-state.service';

@Component({
  selector: 'app-form-tabs',
  templateUrl: './form-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTabsComponent {
  selectedTabIndex = 0;

  formASchema = [
    { type: 'text', label: 'Full Name', name: 'fullName', required: true },
    { type: 'email', label: 'Email', name: 'email' },
    { type: 'checkbox', label: 'Subscribe', name: 'subscribe' }
  ];

  formBSchema = [
    { type: 'text', label: 'Username', name: 'username', required: true },
    { type: 'password', label: 'Password', name: 'password', required: true },
    { type: 'checkbox', label: 'Remember Me', name: 'remember' }
  ];

  constructor(public formStateService: FormStateService) {}

  onSubmit(tabKey: string, formData: any) {
    console.log(`${tabKey} submitted:`, formData);
    this.formStateService.setFormState(tabKey, formData);
  }
}