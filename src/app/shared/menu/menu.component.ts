import { Component, OnInit } from '@angular/core';
import { ButtonsMenuComponent } from "./buttons-menu/buttons-menu.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ButtonsMenuComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  nameRestaurant?: string;
  nameUser?: string;
  sourceImg?:string = 'assets/icons/user-circle.svg';

  constructor() {}

  ngOnInit(): void {
    this.nameRestaurant = localStorage.getItem('nameRestaurant') || undefined;
    this.nameUser = localStorage.getItem('name') || undefined;
  }
}
