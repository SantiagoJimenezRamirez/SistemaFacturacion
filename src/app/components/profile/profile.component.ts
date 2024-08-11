import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MenuComponent, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
