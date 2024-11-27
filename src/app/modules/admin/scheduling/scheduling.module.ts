import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SchedulingComponent } from './scheduling.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: SchedulingComponent
    }
];

@NgModule({
    declarations: [
        SchedulingComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatRadioModule,
        RouterModule.forChild(exampleRoutes)
    ]
})
export class SchedulingModule {}
