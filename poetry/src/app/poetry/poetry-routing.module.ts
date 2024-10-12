import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FragmentComponent } from './fragment/fragment.component';
import { LiteraryWorkComponent } from './literary-work/literary-work.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',  
      pathMatch: 'full',
      canActivate: [AuthGuard]
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'literary-work/:name',
      component: LiteraryWorkComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'literary-work/:name/fragment/:title',
      component: FragmentComponent,
      canActivate: [AuthGuard]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule,
    CommonModule
  ]
})
export class PoetryRoutingModule { }
