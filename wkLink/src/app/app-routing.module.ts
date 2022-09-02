import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { UploadComponent } from './components/views/upload/upload.component';


const routes: Routes = [{
  path: "login", 
  component: LoginComponent
},
{
  path: "", 
  component: HomeComponent,
 
},
{
  path: "upload", 
  component: UploadComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
