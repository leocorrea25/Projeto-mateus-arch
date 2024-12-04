import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/services/services/orders.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss'],
})
export class ClientOrdersComponent implements OnInit {
  orders: any[] = []; // Array para armazenar os pedidos

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        this.orders = response; // Salva os pedidos na variável
        console.log('Pedidos carregados:', this.orders);
      },
      (error) => {
        console.error('Erro ao carregar os pedidos:', error);
      }
    );
  }

  deleteOrder(orderId: number) {
    // Lógica para excluir o pedido
    console.log(orderId);
    
    this.orderService.deleteOrder(orderId).subscribe(
      response => {
        console.log(response);
        
        if (response.success) {
          // Remover o pedido da lista de pedidos
          this.orders = this.orders.filter(order => order.id !== orderId);
          // Exibir mensagem de sucesso ou notificação (opcional)
        } else {
          // Lidar com erro, caso necessário
          console.error('Erro ao excluir pedido');
        }
      },
      error => {
        console.error('Erro ao excluir pedido:', error);
      }
    );
  }
  

}
