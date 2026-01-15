import { Component, input } from '@angular/core';

/**
 * Displays a success message to the user.
 * Used to show confirmation feedback after successful operations.
 */
@Component({
  selector: 'app-success-info',
  standalone: true,
  templateUrl: './success-info.component.html',
  styleUrls: ['./success-info.component.scss'],
})
export class SuccessInfoComponent {
  labelText = input<string>('');
}
