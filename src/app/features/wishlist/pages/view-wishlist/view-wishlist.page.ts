import { Component, inject, OnInit } from '@angular/core';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CardComponent } from './components/card/card.component';
import { WishlistService } from '../../services/wishlist.service';
import { Wishlist } from '../../models/wishlist.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-wishlist',
  standalone: true,
  imports: [CountdownComponent, CardComponent, CommonModule],
  templateUrl: './view-wishlist.page.html',
  styleUrl: './view-wishlist.page.css',
})
export class ViewWishlistPage implements OnInit {
  wishlist!: Wishlist;

  private wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }
}
