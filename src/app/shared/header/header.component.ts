import { Component } from '@angular/core';
import { LogOutComponent } from "../log-out/log-out.component";
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogOutComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedPage: string[] = ['home', 'orders', 'products', 'inventory', 'profile', ];
  nameScreen = localStorage.getItem('name-screen') || 'Home'
  isDropdownVisible = false;

  constructor(private route:Router){}

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  handleOptionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.value;

    this.route.navigateByUrl(selectedOption)

    // Aquí puedes manejar lo que sucederá al seleccionar una opción
  }
}
