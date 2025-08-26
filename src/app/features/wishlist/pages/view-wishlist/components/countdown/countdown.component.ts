import { Component, Input } from '@angular/core';

@Component({
  selector: 'wishlist-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent {
  @Input() expirationDate!: Date;
}
