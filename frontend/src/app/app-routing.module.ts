import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { UploadFilesComponent } from './views/upload-files/upload-files.component';
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
  component: UploadFilesComponent,
  ...canActivate(redirectToLogin)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
