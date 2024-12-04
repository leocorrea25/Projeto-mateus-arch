import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'app/services/services/orders.service';
import { UserServiceApi } from 'app/services/user.service';

export interface Pedido {
  id?: number,
  deliveryOption: string;
  quantity: number;
  address?: { street: string; city: string; postalCode: string } | null;
  pickupLocation?: string | null;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  preferredDate: string;
  preferredTime: string;
  additionalInstructions: string;
}

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, AfterViewInit {

  orders: Pedido[] = [];
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource<Pedido>(this.orders);

  displayedColumns: string[] = [
    'deliveryOption',
    'quantity',
    'additionalInstructions',
    'finish'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: OrderService, public dialog: MatDialog, public userServiceApi: UserServiceApi) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchOrders(): void {
    this.apiService.getAllOrders().subscribe({
      next: (data: Pedido[]) => {
        console.log(data);
        let user
        this.orders = data;
        this.dataSource.data = this.orders; // Atualizando o dataSource com os dados recebidos
        console.log('Ordens:', this.orders);
      },
      error: (err) => console.error('Erro ao carregar ordens:', err),
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  confirmPedido(pedido: Pedido) {
    console.log(pedido);
    this.apiService.confirmOrder(pedido.id).subscribe(
      response => {
        console.log(response);
        // Realiza o reload da página após o sucesso
        window.location.reload();
      },
      error => {
        console.error('Erro ao confirmar pedido:', error);
      }
    );

  }

}
