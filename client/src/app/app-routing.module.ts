import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/body/welcome/welcome.component';
import { BodyComponent } from './components/body/body.component';
import { CategoriesComponent } from './components/body/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent,

    children: [
      { path: 'home', component: WelcomeComponent },
      { path: ':id', component: CategoriesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
