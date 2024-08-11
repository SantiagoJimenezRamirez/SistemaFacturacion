// src/app/interceptors/token.interceptor.ts
import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../services/user.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _userService = inject(UserService);
    const token = _userService.getToken()
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
}
