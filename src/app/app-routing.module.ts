import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageDetailsComponent } from './image-details/image-details.component';

const routes: Routes = [
  {path: '', component: ImageListComponent, pathMatch: 'full'},
  {path: 'image-list',component:ImageListComponent},
  {path: 'image-details/:id', component: ImageDetailsComponent},

  // otherwise redirect to Image List
  {path: '**', redirectTo: '/image-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
