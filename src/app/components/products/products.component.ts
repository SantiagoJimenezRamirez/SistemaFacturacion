import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { ProductsMenuComponent } from "../products-menu/products-menu.component";
import { FormsComponent } from "../../shared/forms/forms.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MenuComponent, HeaderComponent, ProductsMenuComponent, FormsComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  showform = false;
  formType: string = '';

newProduct() {
  this.showform = true;
}

handleClose(event: boolean) {
  this.showform = event; // Cierra el formulario al recibir false
}

  handleEditForm(event: [boolean, string]) {
    this.showform = event[0]; // Abre el formulario
    this.formType = event[1]; // Guarda el tipo de formulario (en este caso, 'edit')
  }
}
