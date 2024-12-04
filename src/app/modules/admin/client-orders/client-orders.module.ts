import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // Adicionado
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { ClientOrdersComponent } from './client-orders.component';

const counterRoutes: Route[] = [
    {
        path: '',
        component: ClientOrdersComponent
    }
];

@NgModule({
    declarations: [
      ClientOrdersComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(counterRoutes),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule, // Importado
        MatInputModule // Importado
        ,MatInputModule, MatDialogModule, FormsModule,
        MatIconModule,MatRadioModule
    ]
})
export class ClientOrdersModule {}
