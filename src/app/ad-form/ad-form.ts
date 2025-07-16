import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Product} from '../product.model';

@Component({
  selector: 'app-ad-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ad-form.html',
})
export class AdForm implements OnInit {
  @Input() initialData: Product | null | undefined = null;
  @Input() serverError: string | null = null;
  @Input() isEditMode = false;
  @Output() formSubmit = new EventEmitter<FormData>();

  adForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.adForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null, this.isEditMode ? null : Validators.required],
      category: ['', Validators.required],
      city: ['', Validators.required],
    });

    if (this.initialData) {
      this.adForm.patchValue(this.initialData);
    }
  }

  get titleControl() {
    return this.adForm.get('title') as FormControl;
  }

  get descriptionControl() {
    return this.adForm.get('description') as FormControl;
  }

  get priceControl() {
    return this.adForm.get('price') as FormControl;
  }

  get imageControl() {
    return this.adForm.get('image') as FormControl;
  }

  get categoryControl() {
    return this.adForm.get('category') as FormControl;
  }

  get cityControl() {
    return this.adForm.get('city') as FormControl;
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (file.size > maxFileSize) {
        this.imageControl.setErrors({fileSize: true});
        this.selectedFile = null;
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        this.imageControl.setErrors({fileType: true});
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.adForm.patchValue({image: file});
      this.imageControl.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.adForm.invalid) {
      this.adForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.adForm.controls).forEach((key) => {
      const control = this.adForm.get(key);
      if (control && control.dirty && control.value && key !== 'image') {
        formData.append(key, control.value);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.formSubmit.emit(formData);
  }
}
