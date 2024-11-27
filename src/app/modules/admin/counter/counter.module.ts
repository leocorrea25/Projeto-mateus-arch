import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; // Adicionado
import { MatInputModule } from '@angular/material/input';
import { EditOrderComponent } from './edit-order/edit-order.component'; // Adicionado
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

const counterRoutes: Route[] = [
    {
        path: '',
        component: CounterComponent
    }
];

@NgModule({
    declarations: [
        CounterComponent,
        EditOrderComponent
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
export class CounterModule {}
