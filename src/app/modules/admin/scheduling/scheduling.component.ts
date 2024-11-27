import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/services/api.service'; // Certifique-se de importar o serviço

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
})
export class SchedulingComponent {
  form = new FormGroup({
    deliveryOption: new FormControl('entrega', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl(''),
    }),
    pickupLocation: new FormControl(''),
    contactName: new FormControl('', Validators.required),
    contactPhone: new FormControl('', Validators.required),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    preferredDate: new FormControl('', Validators.required),
    // preferredTime: new FormControl('', [Validators.required]),
    additionalInstructions: new FormControl(''),
  });

  constructor(private apiService: ApiService) {}

  // Getter and Setter for preferredTime to ensure it always ends with ":00"
  

  // Determina se a opção selecionada é 'entrega'
  isDeliverySelected(): boolean {
    return this.form.get('deliveryOption').value === 'entrega';
  }
  

  // Envia os dados para a API
  onSubmit() {
    if (this.form.valid) {
      const request: DeliveryRequest = this.form.value as DeliveryRequest; // Tipagem explícita
      console.log(request);
      request.preferredTime = "00:00:00"

      this.apiService.createOrder(request).subscribe({
        next: (response) => {
          console.log('Pedido enviado com sucesso:', response);
        },
        error: (err) => {
          console.error('Erro ao enviar o pedido:', err);
        },
      });
    } else {
      console.error('Formulário inválido');
    }
  }
}

export interface DeliveryRequest {
  deliveryOption: 'retirada' | 'entrega'; // Opções possíveis
  quantity: number;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  pickupLocation?: string; // Opcional, usado apenas para retirada
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  preferredDate: string; // ISO 8601 format
  preferredTime: string; // Hora no formato HH:mm:ss
  additionalInstructions?: string; // Opcional
}
