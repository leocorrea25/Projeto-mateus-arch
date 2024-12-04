import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/services/services/orders.service';
import { ProductService } from 'app/services/products.service'
import { CartComponent } from './cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
})
export class SchedulingComponent implements OnInit {

  public produtos: any;

  constructor(private apiService: OrderService, private productService: ProductService, public dialog: MatDialog) { }
  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      response => {
        console.log(response);
        this.produtos = response

      }
    )
    console.log(this.produtos);
  }

  openModal(pedido: any): void {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '1200px',
      data: pedido // Passa os dados do pedido para a modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica após fechar a modal, se necessário
      console.log('Modal fechada', result);
      window.location.reload();
    });
  }
}