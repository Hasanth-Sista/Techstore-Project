import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchService } from './services/search.service';
import { DisplayComponent } from './display/display.component';
import { AppRoutingModule } from './app.routing';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { LoginService } from './services/login.service';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DisplayComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    SpecificationsComponent,
    AboutComponent,
    ContactComponent,
    CartComponent
  ],
  imports: [
    AppRoutingModule,    
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SearchService,LoginService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
