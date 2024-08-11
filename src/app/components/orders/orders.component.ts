import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MenuComponent, HeaderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
