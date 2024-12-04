import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MyProductsComponent } from './my-products.component';


const exampleRoutes: Route[] = [
    {
        path: '',
        component: MyProductsComponent
    }
];

@NgModule({
    declarations: [
      MyProductsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,MatTableModule,
        MatRadioModule,
        RouterModule.forChild(exampleRoutes)
    ]
})
export class MyProductsModule
 {}
