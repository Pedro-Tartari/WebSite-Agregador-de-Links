import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { UploadComponent } from './components/views/upload/upload.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";



const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['upload']);

const routes: Routes = [{
  path: "login", 
  component: LoginComponent,
  ...canActivate(redirectToHome)
},
{
  path: "", 
  component: HomeComponent,
 
},
{
  path: "upload", 
  component: UploadComponent,
  ...canActivate(redirectToLogin)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
