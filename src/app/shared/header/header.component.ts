import { Component } from '@angular/core';
import { LogOutComponent } from "../log-out/log-out.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogOutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  nameScreen = localStorage.getItem('name-screen') || 'Home'

}
