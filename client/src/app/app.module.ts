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

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, BodyComponent, CategoriesComponent, WelcomeComponent, AuthComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
