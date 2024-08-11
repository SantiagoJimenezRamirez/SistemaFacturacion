import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { MenuTableComponent } from "../../subComponents/menu-table/menu-table.component";

@Component({
  selector: 'app-products-menu',
  standalone: true,
  imports: [MenuTableComponent],
  templateUrl: './products-menu.component.html',
  styleUrl: './products-menu.component.scss'
})
export class ProductsMenuComponent implements OnInit{

  @Input() TitleContainer:string = 'Ejemplo';

  constructor(private _producService:FoodService){

  }

  ngOnInit(): void {
  
  }
  


}
