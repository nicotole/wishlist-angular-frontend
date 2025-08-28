import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'wishlist-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent implements OnInit {
  @Input() expirationDate!: Date;
  @Output() countdownFinished = new EventEmitter<void>();
  private intervalId!: number;

  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const expirationTime = new Date(this.expirationDate).getTime();
    const timeRemaining = expirationTime - now;

    if (timeRemaining <= 0) {
      this.days = '00';
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
      clearInterval(this.intervalId);
      this.countdownFinished.emit();
      return;
    }

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    this.days = days.toString().padStart(2, '0');
    this.hours = hours.toString().padStart(2, '0');
    this.minutes = minutes.toString().padStart(2, '0');
    this.seconds = seconds.toString().padStart(2, '0');
  }
}
