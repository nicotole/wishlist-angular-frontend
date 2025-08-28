import { Component, Input } from '@angular/core';
import { Item } from '../../../../models/item.model';

@Component({
  selector: 'wishlist-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() item!: Item;
}
