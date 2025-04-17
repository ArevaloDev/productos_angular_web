import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenServicesService } from '../../services/tokenServices/token-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  public user:any;
  constructor(
    private authService:AuthService,
    private tokenService:TokenServicesService,
    private router:Router

  ){}
  ngOnInit(): void {
    this.user = this.authService.getLocalUser();
    console.log(this.user);

  }

  logout = () => {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }

}
