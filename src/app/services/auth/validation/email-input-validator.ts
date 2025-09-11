import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailInputValidator {

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

}
