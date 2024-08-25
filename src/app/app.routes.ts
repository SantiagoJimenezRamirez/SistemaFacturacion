// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AuthGuard } from './guards/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsComponent } from './shared/forms/forms.component';
import { ProductsMenuComponent } from './components/products-menu/products-menu.component';
import { LoginGuard } from './guards/login.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'sign-up', component: SignUpComponent, canActivate: [LoginGuard] },
    { path: 'pruebas', component: ProductsMenuComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];
