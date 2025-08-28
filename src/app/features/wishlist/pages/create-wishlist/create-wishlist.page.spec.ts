import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWishlistPage } from './create-wishlist.page';

describe('CreateWishlistPage', () => {
  let component: CreateWishlistPage;
  let fixture: ComponentFixture<CreateWishlistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWishlistPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWishlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
