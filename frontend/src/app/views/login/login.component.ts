import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm =  new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toast: HotToastService
    ) {  }

  ngOnInit(): void {  

  }

  login(){
    if (!this.loginForm.valid) {
      return;
    }
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Sucesso !',
        loading: 'Carregando...',
        error: 'Houve um problema'
      })
    ).subscribe(() => {
      this.router.navigate(['/upload']);
    });
  }
}
