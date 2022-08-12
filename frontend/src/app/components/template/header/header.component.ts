import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService ,
    private route: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.route.navigate([''])
    });
  }
}
