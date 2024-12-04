export interface DeliveryRequest {
    deliveryOption: 'retirada' | 'entrega'; // Opções possíveis
    productQuantity: number;
    additionalInstructions?: string; // Opcional
    productId: number
  }