import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PoetryRoutingModule } from './poetry-routing.module';
import { HomeComponent } from './home/home.component';
import { LiteraryWorkComponent } from './literary-work/literary-work.component';
import { FragmentComponent } from './fragment/fragment.component';



@NgModule({
  declarations: [
    HomeComponent,
    LiteraryWorkComponent,
    FragmentComponent
  ],
  imports: [
    CommonModule,
    PoetryRoutingModule,
    RouterModule
  ]
})
export class PoetryModule { }
