import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../products';

@Component({
  selector: 'app-new-ad',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-ad.html',
  styleUrl: './new-ad.css',
})
export class NewAd implements OnInit {
  newAdForm!: FormGroup;
  serverError: string | null = null;
  selectedFile: File | null = null;

  private fb = inject(FormBuilder);
  private productsService = inject(Products);
  private router = inject(Router);

  ngOnInit(): void {
    // Promenjeno 'name' u 'title' da se poklapa sa backend DTO-om
    this.newAdForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null, Validators.required],
      category: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  // Getter za 'title' kontrolu
  get titleControl() {
    return this.newAdForm.get('title') as FormControl;
  }

  get descriptionControl() {
    return this.newAdForm.get('description') as FormControl;
  }

  get priceControl() {
    return this.newAdForm.get('price') as FormControl;
  }

  get imageControl() {
    return this.newAdForm.get('image') as FormControl;
  }

  get categoryControl() {
    return this.newAdForm.get('category') as FormControl;
  }

  get cityControl() {
    return this.newAdForm.get('city') as FormControl;
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (file.size > maxFileSize) {
        this.imageControl.setErrors({ fileSize: true });
        this.selectedFile = null;
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        this.imageControl.setErrors({ fileType: true });
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.newAdForm.patchValue({ image: file });
      this.imageControl.setErrors(null);
    }
  }

  onSubmit(): void {
    this.serverError = null;
    if (this.newAdForm.invalid) {
      this.newAdForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    // Prolazimo kroz sve kontrole i dodajemo ih u FormData
    Object.keys(this.newAdForm.controls).forEach((key) => {
      if (key !== 'image') {
        formData.append(key, this.newAdForm.get(key)?.value);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productsService.createAdWithFile(formData).subscribe({
      next: (newAd) => {
        console.log('Oglas je uspješno kreiran!', newAd);
        this.productsService.products.push(newAd);
        this.router.navigate(['/artikal', newAd._id]);
      },
      error: (error) => {
        this.serverError =
          error.error?.message || 'Došlo je do greške na serveru.';
        console.error('Greška pri kreiranju oglasa', error);
      },
    });
  }
}
