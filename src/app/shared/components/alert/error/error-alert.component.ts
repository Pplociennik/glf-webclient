import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { SuccessAlertComponent } from '../success/success-alert.component';
import { takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
  imports: [MatIcon, MatProgressBar],
})
export class ErrorAlertComponent implements OnInit {
  data = inject(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef);
  countdown: number = 100;

  private static readonly DURATION_MS = 5000;
  private static readonly INTERVAL_MS = 50;
  private static readonly STEP =
    100 / (ErrorAlertComponent.DURATION_MS / ErrorAlertComponent.INTERVAL_MS);

  constructor() {}

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.countdown = 100;

    timer(0, ErrorAlertComponent.INTERVAL_MS)
      .pipe(
        takeWhile(() => this.countdown > 0),
        tap(() => (this.countdown -= ErrorAlertComponent.STEP)),
      )
      .subscribe({
        complete: () => {
          this.snackBarRef.dismiss();
        },
      });
  }
}
