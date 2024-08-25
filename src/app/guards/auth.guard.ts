import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Si el usuario está logueado y trata de acceder a la página de login, redirigir al home
    if (this._userService.isLoggedIn() && route.routeConfig?.path === 'login') {
      this.router.navigate(['/home']);
      return false;
    }

    // Si el usuario no está logueado y trata de acceder a una página protegida
    if (!this._userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Permitir el acceso a la ruta
    return true;
  }
}
