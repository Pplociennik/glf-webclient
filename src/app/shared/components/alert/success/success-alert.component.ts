import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss'],
  imports: [MatIcon, MatProgressBar],
})
export class SuccessAlertComponent implements OnInit {
  data = inject(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef);
  countdown: number = 100;

  private static readonly DURATION_MS = 8000;
  private static readonly INTERVAL_MS = 50;
  private static readonly STEP =
    100 / (SuccessAlertComponent.DURATION_MS / SuccessAlertComponent.INTERVAL_MS);

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.countdown = 100;

    timer(0, SuccessAlertComponent.INTERVAL_MS)
      .pipe(
        takeWhile(() => this.countdown > 0),
        tap(() => (this.countdown -= SuccessAlertComponent.STEP)),
      )
      .subscribe({
        complete: () => {
          this.snackBarRef.dismiss();
        },
      });
  }
}
