import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MenuComponent, HeaderComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {

}
