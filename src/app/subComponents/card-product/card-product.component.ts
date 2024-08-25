import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent implements OnInit {
  
  nameSelect = ''
  
  @Input() filteredProducts: any[] = [];
  @Output() productSelected = new EventEmitter<any>(); // Evento de salida
  
  ngOnInit(): void {
   console.log(this.filteredProducts) 
  }
  selectProduct(object: any) {
    const selectedProduct = {
      id: object.id,
      name: object.name,
      price: object.price,
      urlImage: object.urlImage
    };
    this.productSelected.emit(selectedProduct);
  }


}
