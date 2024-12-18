import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SchedulingComponent } from './scheduling.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { CartComponent } from './cart/cart.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: SchedulingComponent
    }
];

@NgModule({
    declarations: [
        SchedulingComponent,
        CartComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,MatTableModule,
        MatRadioModule,
        RouterModule.forChild(exampleRoutes)
    ]
})
export class SchedulingModule {}
