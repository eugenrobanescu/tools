import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/body/welcome/welcome.component';
import { BodyComponent } from './components/body/body.component';
import { CategoriesComponent } from './components/body/categories/categories.component';
import { AuthComponent } from './components/body/auth/auth.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: WelcomeComponent },
  { path: 'categories/:slug', component: CategoriesComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
