import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../../models/item.model';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private formBuilder = inject(FormBuilder);
  private wishlistService = inject(WishlistService);
  @Output() closed = new EventEmitter<void>();
  @Output() itemCreated = new EventEmitter<Item>();

  addItemForm = this.formBuilder.group({
    link: this.formBuilder.nonNullable.control('', [Validators.required]),
    notes: this.formBuilder.nonNullable.control(''),
  });

  closeAddItem() {
    this.closed.emit();
  }

  addItem() {
    const { link, notes } = this.addItemForm.getRawValue();
    this.wishlistService.scrapData(link).subscribe((item) => {
      const newItem: Item = {
        ...item,
        notes: notes,
      };
      this.itemCreated.emit(newItem);
    });
  }
}
