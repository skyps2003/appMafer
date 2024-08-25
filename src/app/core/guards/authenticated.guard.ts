import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.isAuthenticated()){
    return router.navigate(['/admin/dashboard']);
  }else{
    return true
  }
};
