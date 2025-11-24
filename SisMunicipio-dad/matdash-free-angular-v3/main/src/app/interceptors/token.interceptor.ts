import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from "../providers/services/auth/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const user = authService.getCurrentUser();
  if (token && user) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'X-User-Id': user.personaId?.toString() || ''
      }
    });

    return next(clonedRequest);
  }
  return next(req);
};
