import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'app/services/products.service';
import { createProduct } from 'app/shared/request/create-product';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent {

  productForm: FormGroup;


  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: createProduct = this.productForm.value;
      console.log('Product submitted:', product);
      this.productService.createProduct(product).subscribe(
        response => {
          console.log(response);
          
        }
      )
      // Aqui você pode chamar um serviço para salvar o produto, se necessário
    } else {
      console.log('Form is invalid');
    }
  }



}
