import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Products } from '../products';
import { Product } from '../product.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Potrebno za @if i druge direktive

@Component({
  selector: 'app-edit-ad',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-ad.html',
  styleUrl: './edit-ad.css',
})
export class EditAd implements OnInit {
  adId = input.required<string>();
  private productsService = inject(Products);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  product = signal<Product | undefined>(undefined);
  editAdForm!: FormGroup;
  serverError: string | null = null;
  selectedFile: File | null = null;

  constructor() {
    effect(() => {
      const id = this.adId();
      if (id) {
        // ISPRAVKA: Pretplata na Observable da bismo dobili podatke
        this.productsService.getAdById(id).subscribe({
          next: (productData) => {
            this.product.set(productData);
            if (this.editAdForm) {
              this.patchForm(productData);
            }
          },
          error: (err) => console.error("Greška pri preuzimanju oglasa", err)
        });
      }
    });
  }

  ngOnInit(): void {
    this.editAdForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null], // Slika nije obavezna pri izmeni
      category: ['', Validators.required],
      city: ['', Validators.required],
    });

    // Ako su podaci stigli pre inicijalizacije forme, popuni je
    if (this.product()) {
      this.patchForm(this.product()!);
    }
  }

  // ISPRAVKA: Dodati getteri za sve kontrole
  get titleControl() { return this.editAdForm.get('title') as FormControl; }
  get descriptionControl() { return this.editAdForm.get('description') as FormControl; }
  get priceControl() { return this.editAdForm.get('price') as FormControl; }
  get imageControl() { return this.editAdForm.get('image') as FormControl; }
  get categoryControl() { return this.editAdForm.get('category') as FormControl; }
  get cityControl() { return this.editAdForm.get('city') as FormControl; }

  patchForm(product: Product) {
    this.editAdForm.patchValue({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      city: product.city,
    });
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (file.size > maxFileSize) {
        this.imageControl.setErrors({ fileSize: true }); // ISPRAVKA
        this.selectedFile = null;
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        this.imageControl.setErrors({ fileType: true }); // ISPRAVKA
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.editAdForm.patchValue({ image: file }); // ISPRAVKA
      this.imageControl.setErrors(null); // ISPRAVKA
    }
  }

  onSubmit(): void {
    if (this.editAdForm.invalid) {
      this.editAdForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    Object.keys(this.editAdForm.controls).forEach((key) => {
      const control = this.editAdForm.get(key);
      if (control && control.value && key !== 'image') {
        formData.append(key, control.value);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productsService.updateAd(this.adId(), formData).subscribe({
      next: (updatedAd) => {
        this.router.navigate(['/artikal', updatedAd._id]);
      },
      error: (err) => {
        this.serverError = err.error?.message || 'Došlo je do greške.';
      }
    });
  }
}
