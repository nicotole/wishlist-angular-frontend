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

@Component({
  selector: 'app-create-wishlist',
  standalone: true,
  imports: [CardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './create-wishlist.page.html',
  styleUrl: './create-wishlist.page.css',
})
export class CreateWishlistPage {
  acceptedTypes = DEFAULT_IMG_MIME_TYPES.join(',');
  private formBuilder = inject(FormBuilder);
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

  previewUrl: string | null = null;

  /*
  items: Item[] = [
    {
      name: 'Green Day - American Idiot (CD Nuevo Original)',
      price: '$12.000',
      img: 'https://http2.mlstatic.com/D_NQ_NP_695594-MLU79143085406_092024-O.webp',
      link: 'https://www.mercadolibre.com.ar/green-day-american-idiot-cd-nuevo-original/p/MLA23045646',
      notes: 'Clásico álbum de punk rock.',
    },
    {
      name: 'Remera Bring Me The Horizon - BMTH Paraguas',
      price: '$15.500',
      img: 'https://http2.mlstatic.com/D_NQ_NP_986757-MLA80803972023_112024-O.webp',
      link: 'https://articulo.mercadolibre.com.ar/MLA-1461462273-remera-bring-me-the-horizon-bmth-paraguas-tradicional-_JM',
      notes: 'Soy talle L :)',
    },
    {
      name: "Scott Pilgrim 02 Contra el Mundo - Bryan Lee O'Malley",
      price: '$9.800',
      img: 'https://http2.mlstatic.com/D_NQ_NP_669401-MLC42020368373_052020-O.webp',
      link: 'https://www.mercadolibre.com.ar/scott-pilgrim-02-contra-el-mundo-lee-dmalley-bryan/p/MLA21525911',
    },
    {
      name: 'Nijigahara Holograph - Inio Asano (Tomo Único)',
      price: '$13.200',
      img: 'https://http2.mlstatic.com/D_NQ_NP_693416-MLA45271095001_032021-O.webp',
      link: 'https://www.mercadolibre.com.ar/nijigahara-holograph-tomo-unico-inio-asano-ivrea-manga/p/MLA20944619',
      notes: 'Si no, en cualquier libreria hay',
    },
    {
      name: 'Joystick Microsoft Xbox Series - Robot White',
      price: '$72.000',
      img: 'https://http2.mlstatic.com/D_NQ_NP_863845-MLA45045608183_032021-O.webp',
      link: 'https://www.mercadolibre.com.ar/joystick-microsoft-xbox-nueva-generacion-robot-white-color-blanco/p/MLA16268161',
      notes: 'Prefiero color blanco, pero negro esta bien tambien',
    },
  ];
  */

  get itemsFA(): FormArray<FormGroup> {
    return this.form.get('items') as FormArray<FormGroup>;
  }

  toItem(ctrl: FormGroup): Item {
    return ctrl.getRawValue() as Item;
  }

  addItem() {
    const itemsFA = this.form.get('items') as FormArray;
    const itemGroup = this.formBuilder.group({
      name: this.formBuilder.nonNullable.control('Botella de agua'),
      price: this.formBuilder.nonNullable.control('$2500'),
      img: this.formBuilder.nonNullable.control(
        'https://http2.mlstatic.com/D_NQ_NP_695594-MLU79143085406_092024-O.webp'
      ),
      link: this.formBuilder.nonNullable.control(
        'https://www.mercadolibre.com.ar/green-day-american-idiot-cd-nuevo-original/p/MLA23045646'
      ),
      notes: this.formBuilder.control('Clásico álbum de punk rock.'),
    });
    itemsFA.push(itemGroup);
    console.log(this.form.getRawValue());
  }

  submit() {
    console.log(this.form);
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
