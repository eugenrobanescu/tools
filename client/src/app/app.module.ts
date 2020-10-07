import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { CategoriesComponent } from './components/body/categories/categories.component';
import { WelcomeComponent } from './components/body/welcome/welcome.component';
import { AuthComponent } from './components/body/auth/auth.component';
import { ProductsTemplateComponent } from './components/body/categories/products-template/products-template.component';
import { CategoriesTemplateComponent } from './components/body/categories/categories-template/categories-template.component';
import { CartComponent } from './components/body/cart/cart.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, BodyComponent, CategoriesComponent, WelcomeComponent, AuthComponent, ProductsTemplateComponent, CategoriesTemplateComponent, CartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
