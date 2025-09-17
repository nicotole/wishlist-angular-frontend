import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { minLengthArray } from '../../validators/minLengthArray.validator';
import {
  DEFAULT_IMG_MIME_TYPES,
  imgMaxSize,
  imgMimeType,
  imgRequired,
} from '../../validators/imgFile.validator';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-create-wishlist',
  standalone: true,
  imports: [CardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-wishlist.page.html',
  styleUrl: './create-wishlist.page.css',
})
export class CreateWishlistPage {
  acceptedTypes = DEFAULT_IMG_MIME_TYPES.join(',');
  private wishlistService = inject(WishlistService);
  private formBuilder = inject(FormBuilder);
  isOpen = false;
  form = this.formBuilder.group({
    title: this.formBuilder.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    eventDate: this.formBuilder.nonNullable.control('', [Validators.required]),
    items: this.formBuilder.array<FormGroup>([], [minLengthArray(1)]),
    image: this.formBuilder.control<File | null>(null, {
      validators: [
        imgRequired(),
        imgMimeType(),
        imgMaxSize(2 * 1024 * 1024), // 2MB
      ],
    }),
  });

  addItemForm = this.formBuilder.group({
    link: this.formBuilder.nonNullable.control('', [Validators.required]),
    notes: this.formBuilder.nonNullable.control(''),
  });

  previewUrl: string | null = null;

  get itemsFA(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  toItem(ctrl: FormGroup): Item {
    return ctrl.getRawValue() as Item;
  }

  addItem() {
    const { link, notes } = this.addItemForm.getRawValue();

    this.wishlistService.scrapData(link).subscribe((item) => {
      const newItem: Item = {
        ...item,
        notes: notes,
      };
      const itemsFA = this.form.get('items') as FormArray;
      const itemGroup = this.formBuilder.group(newItem);
      itemsFA.push(itemGroup);
      console.log(this.form.getRawValue());
      this.closeAddItem();
    });
  }

  submit() {
    console.log(this.form);
  }

  openAddItem() {
    this.isOpen = true;
  }

  closeAddItem() {
    this.isOpen = false;
  }

  openEditItemModal(i: number) {
    // TO-DO
    console.log(i);
  }

  removeItem(i: number) {
    this.itemsFA.removeAt(i);
  }

  onFileChange(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;

    const ctrl = this.form.get('image');
    ctrl?.setValue(file);
    ctrl?.markAsDirty();
    ctrl?.updateValueAndValidity();
  }
}
