import { Routes, RouterModule } from '@angular/router';
import { NgModule }  from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';

const APP_ROUTES: Routes = [
  { path: 'main', component : MainComponent },  
    {path: 'display', component:DisplayComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'specs',component:SpecificationsComponent},
    {path:'cart',component:CartComponent},
    { path: '', redirectTo:'/main', pathMatch:'full' },
    {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

//export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);