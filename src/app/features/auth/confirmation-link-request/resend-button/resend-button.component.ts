import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-resend-button',
  templateUrl: './resend-button.component.html',
  styleUrls: ['./resend-button.component.scss'],
})
export class ResendButtonComponent implements OnInit {
  @Output() btnClicked = new EventEmitter<void>();
  @Input() btnText!: string;
  countdown: number = 0;
  isCounting: boolean = false;

  onSubmit() {
    this.btnClicked.emit();
    this.startCountdown();
  }

  startCountdown() {
    this.countdown = 30;
    this.isCounting = true;

    timer(0, 1000)
      .pipe(
        takeWhile(() => this.countdown > 0),
        tap(() => this.countdown--),
      )
      .subscribe({
        complete: () => {
          this.isCounting = false;
        },
      });
  }

  constructor() {}

  ngOnInit() {}
}
