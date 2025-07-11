import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormStateService {
  private formState = new BehaviorSubject<{ [key: string]: any }>({});

  setFormState(formKey: string, data: any): void {
    const current = this.formState.value;
    this.formState.next({ ...current, [formKey]: data });
    localStorage.setItem('formState', JSON.stringify({ ...current, [formKey]: data }));
  }

  getFormState(formKey: string): any {
    const saved = JSON.parse(localStorage.getItem('formState') || '{}');
    return saved[formKey] || null;
  }
}