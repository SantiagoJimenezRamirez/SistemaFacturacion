import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
