import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Wishlist } from '../models/wishlist.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  whislist = {
    title: 'Cumple de Nico',
    expirationDate: new Date(2025, 7, 29),
    headerImg:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0DjNPzet54NzTZhNmAk90DCmxQ6X8WWpGmwNQ_144KGbNPw8950JcwZ5ZGRxiC-z2HVv7hKjKs3gpkE1g_zyWxH0iBTcR-LLhDNskctdXNtYuRre2328n9On_ZZg2tOe-UgBisNbnkONK_zF1C5mGM0z4Z-hAsLNHAbywYrC_H-4EuP9Fb1cNHK7IuwG2h8Sv1y2dqq__N0crAWWmez1m9OkUhE-N3y0ySCOp03lOUaXg5bA6xk4vPhMe_yrHbpFbQsb6FQK6lk1z',
    items: [
      {
        name: 'Green Day T-Shirt',
        price: '$100',
        img: 'https://http2.mlstatic.com/D_NQ_NP_777914-MLA53382213373_012023-O.webp',
        link: 'https://articulo.mercadolibre.com.ar/MLA-1141246915-remera-green-day-exclusivo-gris-ranglan-_JM?searchVariation=174611957858#polycard_client=search-nordic&searchVariation=174611957858&position=24&search_layout=grid&type=item&tracking_id=f8f73c6a-6c86-41bf-9181-4098dfa8da7f',
      },
    ],
  };

  getWishlist(): Observable<Wishlist> {
    return of(this.whislist);
  }

  scrapData(link: string): Observable<Item> {
    const mock: Item = {
      name: 'Green Day T-Shirt',
      price: '$100',
      img: 'https://http2.mlstatic.com/D_NQ_NP_777914-MLA53382213373_012023-O.webp',
      link,
    };

    return of(mock).pipe(delay(800));
  }
}
