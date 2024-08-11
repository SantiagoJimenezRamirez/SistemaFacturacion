import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { FoodService } from '../../services/food.service';
import { ZoneInputsComponent } from '../../subComponents/zone-inputs/zone-inputs.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ZoneInputsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Input() formType: string = ''; // Añadir Input para el tipo de formulario

  typeform = '';
  categories: any = [];

  formProduct = new FormGroup({
    'routeImg': new FormControl('', Validators.required),
    'name': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'category': new FormControl('', Validators.required),
    'description': new FormControl('', Validators.required),
  });

  constructor(private _categoryService: CategoriesService, private _foodService: FoodService) {}

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  onSubmit() {
    const nameFood = this.formProduct.get('name')?.value;
    const price = Number(this.formProduct.get('price')?.value);
    const category = this.formProduct.get('category')?.value;
    const urlImage = this.formProduct.get('routeImg')?.value; // Asegúrate de que el nombre del control sea correcto
    const description = this.formProduct.get('description')?.value;
    
    if (this.formProduct.valid) {
      const food = {
        name: nameFood,
        price: price,
        category: category,
        urlImage: urlImage,
        description: description
      };

      this._foodService.newFood(food).subscribe({
        next: (response) => console.log('Product created:', response),
        error: (error) => console.error('Error creating product:', error)
      });
    } else {
      console.error('Form is not valid:', this.formProduct.errors);
    }
  }

  closeForm($event: MouseEvent) {
    this.close.emit(false)
  }
  handleEvent(event: string){
    this.typeform = event;
  }
}
