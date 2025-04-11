import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServicesService } from '../services/tokenServices/token-services.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenServicesService);
  const router = inject(Router);

  const token = tokenService.getToken();
  if(!token){
    router.navigate(['/login'])
  }
  return true;
};
