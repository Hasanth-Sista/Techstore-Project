import { Routes, RouterModule } from '@angular/router';
import { NgModule }  from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const APP_ROUTES: Routes = [
  { path: 'main', component : MainComponent },  
  { path: '', redirectTo:'/main', pathMatch:'full' },
    {path: 'display', component:DisplayComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
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