import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from '../counter.component'; // Importando a interface Pedido
import { ApiService } from 'app/services/services/api.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {

  constructor(
    public dialogRef: MatDialogRef<EditOrderComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Pedido // Recebendo os dados do pedido
  ) { }

  onNoClick(): void {
    this.dialogRef.close(); // Fechar o diálogo sem salvar
  }

  onSave(): void {
    if (this.data.deliveryOption === 'entrega' && !this.data.address) {
      this.data.address = { street: '', city: '', postalCode: '' }; // Garantir que o endereço esteja preenchido
    }

    console.log(this.data);
    

    this.apiService.updateOrder(this.data.id, this.data) // Passar os dados para a API
      .subscribe(response => {
        this.dialogRef.close(this.data); // Fechar o diálogo e retornar os dados editados
      }, error => {
        console.error('Erro ao atualizar o pedido', error);
      });
  } 
  

  onStreetChange(newStreetValue: string): void {
    if (!this.data.address) {
      this.data.address = { street: '', city: '', postalCode: '' };
    }
    this.data.address.street = newStreetValue;
  }
}
