import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'wishlist',
    children: [
      {
        path: 'view/:id',
        loadComponent: () =>
          import('./features/wishlist/pages/view-wishlist/view-wishlist.page').then(
            (m) => m.ViewWishlistPage
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/wishlist/pages/create-wishlist/create-wishlist.page').then(
            (m) => m.CreateWishlistPage
          ),
      },
    ],
  },
];
