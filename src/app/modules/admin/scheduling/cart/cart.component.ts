import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'app/services/services/orders.service';
import { DeliveryRequest } from 'app/shared/request/DeliveryRequest';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  orderForm: FormGroup;
  public pedidos: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public pedido: DeliveryRequest,
    private fb: FormBuilder,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<CartComponent>
  ) {

    this.pedidos = pedido
    // Inicializa o formulário com valores padrão ou vindos de `pedido`
    this.orderForm = this.fb.group({
      deliveryOption: [pedido.deliveryOption || '', Validators.required],
      quantity: [ '', [Validators.required, Validators.min(1)]],
      additionalInstructions: [pedido.additionalInstructions || ''],
    });
  }

  // Fecha a modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // Envia o pedido para o servidor
  submitOrder(): void {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      console.log(this.pedido);
      
      
      // Cria o objeto DeliveryRequest a partir do formulário
      const orderData: DeliveryRequest = {
        deliveryOption: this.orderForm.get('deliveryOption')?.value,
        productQuantity: this.orderForm.get('quantity')?.value,
        additionalInstructions: this.orderForm.get('additionalInstructions')?.value,
        productId: this.pedidos.id
      };

      console.log(orderData);
      

      // Faz a requisição ao serviço
      this.orderService.createOrder(orderData).subscribe({
        next: (response) => {
          console.log('Pedido criado com sucesso:', response);
          this.dialogRef.close(response); // Fecha a modal e retorna os dados
        },
        error: (err) => {
          console.error('Erro ao criar o pedido:', err);
        },
      });
    } else {
      console.log('Formulário inválido!');
    }
  }
}
