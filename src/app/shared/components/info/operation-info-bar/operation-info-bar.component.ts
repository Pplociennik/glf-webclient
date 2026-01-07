import { Component, Input } from '@angular/core';
import { ErrorInfoComponent } from './error-info/error-info.component';
import { SuccessInfoComponent } from './success-info/success-info.component';

@Component({
  selector: 'app-operation-info-bar',
  standalone: true,
  imports: [ErrorInfoComponent, SuccessInfoComponent],
  templateUrl: './operation-info-bar.component.html',
  styleUrls: ['./operation-info-bar.component.scss'],
})
export class OperationInfoBarComponent {
  @Input() success: boolean = false;
  @Input() show: boolean = false;

  @Input() labelText: string = '';
}
