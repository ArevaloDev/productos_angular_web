import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenServicesService } from '../tokenServices/token-services.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenServicesService);
  const token = tokenService.getToken();

  const secureUrls = ['/categorias'];
  const isSecure = secureUrls.some(url => req.url.includes(url));

  if(token && isSecure){
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }
  return next(req);
};
