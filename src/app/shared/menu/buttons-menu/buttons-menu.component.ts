import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons-menu',
  standalone: true,
  imports: [],
  templateUrl: './buttons-menu.component.html',
  styleUrl: './buttons-menu.component.scss'
})
export class ButtonsMenuComponent {
  @Input() valueButton:string = '';

  constructor(private route:Router){

  }

  navigateByValue(){
    localStorage.setItem('name-screen',this.valueButton)
    this.route.navigateByUrl('/' + this.valueButton.toLowerCase())
  }

}
